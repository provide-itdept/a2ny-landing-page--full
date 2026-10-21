# Deployment outline

## Client

Build with `npm --prefix client run build` and serve `client/dist` from Nginx or a static host. Configure SPA fallback to `index.html` for client navigation, while preserving `robots.txt`, `sitemap.xml`, and asset caching.

## Server

Set environment variables from `.env.example`, run migrations in order, then start with `npm --prefix server start` under PM2 or Docker. Put the API behind HTTPS and restrict `CLIENT_ORIGIN` to the real production origin.

## Data and secrets

Use a least-privilege PostgreSQL account, encrypted backups, a random `ADMIN_API_KEY`, and a configured SMTP provider. Never commit `.env` or submitted lead data.
