# horaria — Landing Page

Statische Marketing-/Landing-Page für [horaria](../horaria) (Public-Transport-Planning-Plattform).
Öffentlich zugänglich, kein Backend, keine sensiblen Daten, keine Geschäftslogik —
nur ein Einstiegspunkt mit Login-Link zur Web-App.

Architektur: siehe arc42 Kapitel 4 (Lösungsstrategie) im Haupt-Repo
(`horaria/docs/arc42/04-solution-strategy.md`). Zentrale Entscheidung:
Sicherheitsrelevante Komponenten (Authentifizierung, Geschäftslogik, Daten)
liegen ausschliesslich im Kubernetes-Cluster; diese Seite ist ein
reduzierter, austauschbarer Einstiegspunkt.

## Technologie

- Statisches HTML/CSS/JS — kein Server, kein Build, minimaler Angriffsvektor
- Hosting: GitHub Pages (`git push` = Release, CDN + TLS via Let's Encrypt)
- Eigene Domain via `CNAME` + DNS (A/AAAA-Records von GitHub Pages)

## Struktur

```
├── index.html          # Startseite (CSP als Meta-Tag, deklaratives HTML)
├── 404.html            # GitHub Pages zeigt diese Datei automatisch bei 404
├── CNAME               # Custom Domain (horaria.ch)
├── .nojekyll           # Jekyll-Verarbeitung überspringen
├── css/
│   └── styles.css      # Design-Tokens aus dem "Drafting Table"-Stil der App
├── js/
│   └── main.js         # APP_URL (Ziel des Login-Buttons), Footer-Jahr
└── assets/
    └── images/         # Produktbilder als WebP, responsive (srcset), lazy
```

## Konfiguration

**Login-Ziel:** In `js/main.js` die Konstante `APP_URL` setzen
(Standard: `https://app.horaria.ch`). Alle Elemente mit der Klasse
`js-login-link` werden darauf zeigen. Der Identity Provider muss die
Redirect-URIs beider Domains kennen (arc42 §4.5).

**Domain:** `CNAME` enthält `horaria.ch`. Beim DNS-Provider die GitHub-Pages-
Records setzen (siehe [GitHub-Doku](https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site)):
Apex: `A`-Records auf `185.199.108.153` … `185.199.111.153`,
Subdomain (`www`): `CNAME` auf `<user>.github.io`. HTTPS in den
Repo-Einstellungen erzwingen.

## Deployment

GitHub Pages mit "Deploy from Branch" (`main`, Root) — kein Workflow nötig:

1. Repo auf GitHub anlegen (öffentlich) und pushen:
   `git remote add origin git@github.com:<user>/horaria-landingPage.git`
2. Repo → **Settings → Pages** → Source: `main` / `/ (root)`
3. DNS-Records setzen, HTTPS erzwingen — fertig.

Landing-Page und App werden unabhängig voneinander released; ein Fehler in
der App beeinflusst die Erreichbarkeit der Seite nicht (und umgekehrt).

## Lokale Entwicklung

Einfach `index.html` im Browser öffnen, oder:

```sh
python -m http.server 8000   # http://localhost:8000
```

## Richtlinien

- **Keine sensiblen Inhalte** — die Seite ist öffentlich und hat keinen
  Zugriffsschutz (GitHub-Pages-Einschränkung, arc42 §4.5)
- **Bilder:** WebP, responsive per `srcset`, `loading="lazy"` → Seitengröße < 1 MB
- **CSP** als Meta-Tag in jeder HTML-Datei pflegen; bei Self-Hosting der Fonts
  die `fonts.googleapis.com`/`fonts.gstatic.com`-Einträge entfernen
- **Commit-Messages:** [Conventional Commits](https://www.conventionalcommits.org)
  (`feat:`, `fix:`, `docs:`, …) — gleiche Konvention wie im Haupt-Repo
