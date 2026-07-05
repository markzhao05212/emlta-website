# EMLTA Website

Marketing website for **Weihai EMLTA Chemical** — PVC additives (processing aids, foaming aids, impact modifiers), stabilizers, and PVC extrusion machinery.

Static site, no build step, no backend. Built from the Claude Design handoff (5 pages, high-fidelity port).

## Pages

| Route | File |
|---|---|
| `/` | `index.html` — hero video, 3D logo, products teaser, CEO message, export band |
| `/products/` | `products/index.html` — 11-grade catalog, filters, detail modal, machinery section |
| `/services/` | `services/index.html` |
| `/about/` | `about/index.html` — company story, stats, dot-matrix world map |
| `/contact/` | `contact/index.html` |

## Structure

- `assets/css/site.css` — shared design tokens, nav, footer, common patterns
- `assets/js/` — nav drawer, page scripts
- `assets/images/`, `assets/video/` — production assets
- `logo3d.html` — standalone three.js 3D logo, embedded in an iframe on the home page
- `partials/` — reference copies of the shared nav/footer markup (inlined into each page; edit a partial → copy the change into all 5 pages)

## Local preview

Any static file server works, e.g.:

```sh
python3 -m http.server 8000
```

then open http://localhost:8000.

## Deployment

Deployed via GitHub Pages from the repository root on the `main` branch.
