# Andreas Nissen: Hugo portfolio

A Hugo portfolio and long-form writing site for Andreas Nissen, deployed automatically with GitHub Pages.

**Live site:** <https://andreasniss.github.io/personal-website/>

## What is included

- Homepage with positioning, selected projects, selected writing, and workshop themes
- Writing archive with three launch articles and two verified imports from Andreas's published LinkedIn activity
- Project pages grounded in verified public repositories
- Talks and workshop-formats page without inventing past speaking claims
- About page, RSS, sitemap support, social metadata, 404 page, and responsive styles
- Persistent creator attribution linking to Andreas's verified GitHub profile
- No external theme, web font, JavaScript framework, analytics, or CMS dependency

## Run locally

Install Hugo 0.165.0 or newer, then run:

```sh
hugo server --buildDrafts
```

Open `http://localhost:1313/`.

## Build

```sh
hugo --minify
```

The generated site is written to `public/`.

## Deployment

Every push to `main` runs the GitHub Pages workflow in `.github/workflows/deploy-pages.yml`. The workflow builds the production site with Hugo Extended, uploads the generated `public/` directory, and deploys it to GitHub Pages.

The production URL is <https://andreasniss.github.io/personal-website/>. Pull requests run the content validator and a production-equivalent Hugo build without publishing.

## Publication checklist

1. Confirm the email/contact choice. The site currently uses LinkedIn and GitHub only.
2. Review every article and project page for public-safe claims.
3. Run `node scripts/check-content.mjs` and a real Hugo build.
4. Inspect the homepage, one article, one project, and the 404 page on narrow and wide screens.
5. Merge only after the pull-request checks pass.

## Content structure

```text
content/
  about/
  projects/
  talks/
  writing/
layouts/
  _default/
  partials/
assets/css/
static/
```

The private Obsidian vault remains the research backend. Public content is promoted manually into this repository after a confidentiality and claims review.

## Dual-publication contract

The owned website is the canonical home for Andreas's authored professional writing. LinkedIn is a distribution channel.

For every new original LinkedIn post:

1. Prepare a publication-safe website article in `content/writing/` from the same final argument.
2. Verify claims, sources, links, confidentiality, metadata, and mobile readability.
3. Publish the website version before or in the same publishing session as LinkedIn.
4. Publish the LinkedIn derivative and record its verified live URL in `linkedinURL`.
5. Treat the pair as incomplete until both versions exist. Reposts, comments, and reactions do not create website articles.

If a deployment is temporarily unavailable, complete step 1 in this repository and keep the article review-ready. Do not claim that a new website article is public before its deployment succeeds.
