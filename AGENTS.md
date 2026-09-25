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

### Forbidden — never publish from the horaria repo

- Architecture and infrastructure internals: Kubernetes, Knative, scale-to-zero,
  service names, Kourier/NATS/PostgreSQL/Valkey, observability, CI/CD, GitOps
- Cost figures, cost baselines, licensing internals (BYOC/SaaS mechanics,
  entitlement claims, ADR content)
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

## Site conventions

- Copy is German; `<html lang="de">` on every page
- Owner/company data is unknown — use `[Platzhalter]` with a `data-placeholder`
  attribute in legal pages; never invent real names, addresses, or numbers
- Fonts are self-hosted in `assets/fonts/` (OFL-licensed) — do not add CDN
  fonts or any third-party asset; keep every page's CSP meta tag strict
  (`default-src 'self'`); if a resource must be external, document why
- Total page weight target: < 1 MB — images as WebP with `srcset` +
  `loading="lazy"` in `assets/images/`
- Keep the header/footer shell identical on every page
