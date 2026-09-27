# AGENTS.md

Notes for AI agents (and humans) working in this repository.

## Confidentiality — this repo is PUBLIC, the horaria docs are NOT

This site is served publicly from GitHub Pages. The main product repository
(`../horaria`) contains proprietary, non-public material. **Nothing internal
may be copied into this repository or onto this website.**

### Allowed here (public, product-level information only)

- Product vision from arc42 §1, in plain marketing language: the planning
  chain (Fahrplan → Umlauf → Dienstplanung), browser-based, no installation
- Feature headlines from the public requirements list (real-time collaboration,
  publishing/frozen periods, GTFS import/export, multi-tenancy)
- Brand assets (logo, name) and the "Drafting Table"/logo color palette
- Roadmap statements only as "in Planung"
- Marketing-level infrastructure claims (owner decision, Sept 2026):
  scale-to-zero, cloud-agnostic deployment, operation in the customer's own
  Kubernetes cluster, and cost-effective positioning ("kosteneffiziente
  Alternative zu etablierten Planungssystemen") — generic marketing copy,
  no stack details
- Pricing page (`preise.html`): package tiers with "Preis auf Anfrage" —
  no concrete figures until the owner provides them

### Forbidden — never publish from the horaria repo

- Architecture and infrastructure internals beyond the approved marketing
  claims above: Knative, internal service names, Kourier/NATS/PostgreSQL/Valkey,
  observability, CI/CD, GitOps
- Cost figures, cost baselines, licensing internals (entitlement claims, ADR
  content) — the pricing page stays at "auf Anfrage" until the owner sets numbers
- `docs/handoffs`, `docs/data-model`, `docs/microservice-model`,
  `docs/licensing` — internal documents, do not quote
- IdP choice, security concepts, messaging/persistence details
- Anything marked internal or not explicitly product-level marketing material

When in doubt, write generic marketing copy or ask the owner first.

## Commit messages — Conventional Commits (required)

Same convention as the main horaria repo:

```
<type>(<scope>): <imperative summary>
```

- `feat` → new content/section, `fix` → correction, `docs`, `chore` → no release
- Reasonable scopes here: `site`, `legal`, `styles`, `content`
- Releases are automated: release-please (GitHub Action, `.github/workflows/release.yml`)
  parses these commits and opens release PRs on `main`. Never tag or bump
  versions manually; the version lives in `.release-please-manifest.json`,
  the changelog in `CHANGELOG.md`.

## Site conventions

- Copy is German; `<html lang="de">` on every German page (`lang="en"` on
  the English pages under `/en/`)
- Owner/company data is unknown — use `[Platzhalter]` with a `data-placeholder`
  attribute in legal pages; never invent real names, addresses, or numbers
- Fonts are self-hosted in `assets/fonts/` (OFL-licensed) — do not add CDN
  fonts or any third-party asset; keep every page's CSP meta tag strict
  (`default-src 'self'`); if a resource must be external, document why
- Total page weight target: < 1 MB — images as WebP with `srcset` +
  `loading="lazy"` in `assets/images/`
- The modules are licensed individually and branded `horaria.plan`
  (Fahrplanplanung, verfügbar), `horaria.vehicle` (Umlaufplanung, in Planung),
  and `horaria.crew` (Dienstplanung, in Planung) — refer to them by these
  names everywhere
- Keep the header/footer shell identical on every page (nav: Funktionen,
  Preise, language switcher, Registrieren, Login)
- Language switcher in the header: borderless `<details>` toggle (globe icon +
  current language code + caret) opening a dropdown with Deutsch / English /
  Français greyed as "in preparation". English pages live under `/en/`
  (`en/index.html`, `en/preise.html`) with root-absolute asset paths and
  `hreflang` alternates on both language versions; legal pages (Impressum,
  Datenschutz) stay German-only, so the EN menu entry there links to `/en/`.
  Don't create `/fr/` pages until a French translation exists
