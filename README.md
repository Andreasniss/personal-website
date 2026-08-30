# Andreas Nissen: Hugo portfolio

An unpublished first version of Andreas Nissen's personal portfolio and long-form writing site.

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

## Before publishing

1. Replace `baseURL` in `hugo.yaml` with the final HTTPS domain.
2. Decide whether to create a public source repository. If so, set `params.sourceURL` to its verified URL.
3. Confirm the email/contact choice. The current site uses LinkedIn and GitHub only.
4. Review every article and project page for public-safe claims.
5. Run `node scripts/check-content.mjs` and a real Hugo build.
6. Inspect the homepage, one article, one project, and the 404 page on narrow and wide screens.
7. Add the selected host's deployment configuration only when publication is authorized.

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

Until the website has a live host, complete step 1 in this repository and keep the article review-ready. Do not claim that the website version is public before deployment succeeds.
