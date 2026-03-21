# AGENTS.md

## Cursor Cloud specific instructions

### Overview

Static HTML/CSS/JS tourism survey application ("Туризм России 2026"). Zero build step, no package manager, no backend — all data persists in browser `localStorage`.

### Files

| File | Purpose |
|---|---|
| `index.html` | Main survey page (welcome, user info form, 19-question quiz, thank-you screen) |
| `admin.html` | Admin panel (response table, CSV export) — requires auth session |
| `dashboard.html` | Public analytics dashboard (Chart.js charts, role/region filters) |
| `i18n.js` | Russian/English translations |

### Running the dev server

Serve the project root with any static HTTP server on port 3000:

```sh
serve -l 3000 .
```

`index.html` loads `i18n.js` via absolute path (`/i18n.js`), so a proper HTTP server is required — `file://` protocol will not work.

### Admin credentials

Login: `admin` / `0911`. Authentication is handled client-side in `index.html` (line ~998) with a 15-minute session stored in `localStorage`. The admin panel (`admin.html`) checks the session and redirects to `index.html#admin` if expired.

### Lint / Test / Build

There are no linters, test frameworks, or build tools configured. The app is self-contained static HTML with inline `<style>` and `<script>` tags plus CDN dependencies (Google Fonts, Lucide Icons, Chart.js).

### Gotchas

- `admin.html` will redirect to `index.html#admin` if visited without an active admin session. Log in via the "Войти" button on `index.html` first.
- CDN scripts (`unpkg.com/lucide`, `cdn.jsdelivr.net/chart.js`) must be reachable for icons and charts to render.
