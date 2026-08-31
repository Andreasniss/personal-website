# Andreas Nissen: Hugo portfolio

A Hugo portfolio and long-form writing site for Andreas Nissen, deployed automatically with GitHub Pages.

**Live site:** <https://andreasnissen.dev/>

## What is included

- Homepage with positioning, selected projects, and selected writing
- Writing archive with three launch articles and two verified imports from Andreas's published LinkedIn activity
- Project pages grounded in verified public repositories or owned live demos
- A clearly separated "Work I Love" collection for attributed external articles, blogs, and repositories
- A Selected Impact page that separates public proof, professional scope, and personally owned workshop material
- A reviewed workshop page with public-safe artifacts and explicit ownership boundaries
- About page, RSS, sitemap support, social metadata, 404 page, and responsive styles
- Page-specific 1200 by 630 Open Graph images generated from one reproducible visual system
- Shared GitHub profile mark used in the header, browser icon, Apple touch icon, and social metadata
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

The production URL is <https://andreasnissen.dev/>. Pull requests run the content validator and a production-equivalent Hugo build without publishing.

## Publication checklist

1. Keep LinkedIn as the professional contact route unless Andreas explicitly publishes another address. Never infer a domain email.
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
  work-i-love/
  writing/
layouts/
  _default/
  partials/
assets/css/
static/
```

The private Obsidian vault remains the research backend. Public content is promoted manually into this repository after a confidentiality and claims review.

## Talks publication gate

Each public talk needs a title, question or abstract, audience, verified delivery scope, discussion path, participant outcome, and at least one inspectable artifact such as slides, a recording, an event page, code, a demo, or a related article. The page must distinguish the larger event from the material Andreas personally owned. Hypothetical formats and unreviewed drafts stay unpublished.

## Social preview images

Published articles, projects, talks, About, Talks, and Selected Impact carry page-specific 1200 by 630 PNG metadata. Run `scripts/generate-social-images.sh` after changing a title or visual label, commit the generated assets, and verify that the built HTML includes the absolute image URL, dimensions, alt text, and `summary_large_image` card type.

## Evidence-ready project contract

A featured project may set `evidenceReady: true` only when its page gives a skeptical reviewer a short, verifiable path through the work. The page must include:

1. A compact set of linked proof statistics with a verification date.
2. A guided local path with prerequisites, exact actions, expected results, and a no-run fallback.
3. An accurate architecture visual that exposes the important trust boundaries.
4. A claim-to-proof matrix linking directly to source, tests, evaluations, security controls, or CI.
5. Explicit limitations that distinguish deterministic checks, model evaluation, and production readiness.

`layouts/partials/project-evidence.html` renders this shared structure from project frontmatter. Do not set the flag for a thin experiment, an unmodified fork, or a project whose public evidence no longer matches its reviewed repository head.

## Curated references contract

`content/work-i-love/` is for external work Andreas follows and recommends. It is deliberately separate from `content/projects/`, which contains only work Andreas can personally substantiate.

Every reference must:

1. Link directly to the original article, blog, or repository, never an unchanged fork.
2. Name the original creator or organization.
3. Include a short, personal explanation of why the work is useful.
4. Avoid language that implies authorship, contribution, affiliation, or endorsement.

## Cross-channel publishing contract

The owned website is the canonical home for Andreas's authored professional writing. LinkedIn and X are distribution channels with their own formats and lengths.

For every new original LinkedIn post:

1. Prepare a publication-safe website article in `content/writing/` from the same final argument.
2. Verify claims, sources, links, confidentiality, metadata, and mobile readability.
3. Publish the website version before or in the same publishing session as LinkedIn.
4. Derive separate LinkedIn and X versions. Adapt the hook, structure, length, and call to action instead of copying identical text.
5. Publish both derivatives and record their verified live URLs in `linkedinURL` and `xURL`.
6. Treat the package as incomplete until all three versions exist. Reposts, comments, reactions, and replies do not create website articles.

If a deployment is temporarily unavailable, complete step 1 in this repository and keep the article review-ready. Do not claim that a new website article is public before its deployment succeeds.
