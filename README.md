# chatAI

A pure-frontend chat app that calls GitHub’s Models Marketplace API directly.

## Setup

1. Replace `GITHUB_TOKEN` and `MODEL_SLUG` in `src/config.js`.
2. Serve `public/index.html` (e.g. via `live-server` or GitHub Pages).

## Security Warning

Putting a GitHub token in client-side JS _exposes it to everyone_. For a real production app, you should proxy requests through a server that holds the secret.

## Deployment

Since it’s plain HTML/CSS/JS, you can host on GitHub Pages, Netlify, Vercel, etc. Set up your CI/CD in GitHub to:

- Lint (`eslint`)
- Build (if you add bundling)
- Deploy `public/` and `src/`

Enjoy your zero-backend AI chat!

This will currently be using perplexity api keys!
