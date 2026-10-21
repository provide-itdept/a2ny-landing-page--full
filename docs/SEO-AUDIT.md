# A2NY IT WORKS SEO and launch audit

## Implemented in this repository

- Page-level title, description, canonical, and Open Graph metadata.
- Route-specific public page hierarchy for services, solutions, industries, blog, projects, contact, and legal pages.
- Visible breadcrumbs and JSON-LD for services and articles.
- `client/public/robots.txt` and `client/public/sitemap.xml`.
- Semantic headings, descriptive links, responsive layout, and accessible form labels.

## Required before public launch

- Confirm the real domain, business name, service area, phone, email, address, and social URLs.
- Replace editorial placeholders with reviewed articles, author details, approved project stories, and legal copy.
- Validate the sitemap against the deployed canonical domain and submit it in Google Search Console.
- Add consent-aware GA4 measurement and test conversions.
- Run Lighthouse, PageSpeed Insights, Rich Results Test, and a crawl against the deployed build.
- Add SSR or a static prerender pipeline if the hosting environment cannot serve crawlable HTML for every route.

No indexing, ranking, Search Console verification, or business credential is claimed by this repository.
