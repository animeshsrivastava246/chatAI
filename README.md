# chatAI

## Setup

1. Clone this repo
2. Fill in `src/config.js` with your real API_BASE and auth headers
3. Serve `public/index.html` (e.g. via `live-server` or as static assets)

## Deploy

- Build step isn’t required since we’re shipping plain JS/CSS, but you can
  integrate a bundler (Webpack/Vite) if you want to tree-shake or
  transpile.
- CI/CD: On each push, you can lint, test (if you add tests), then
  deploy `public/` + `src/` to GitHub Pages, Netlify, Vercel, etc.
