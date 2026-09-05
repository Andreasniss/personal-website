# Andreas Nissen: Hugo portfolio

A Hugo portfolio and long-form writing site for Andreas Nissen, deployed automatically with GitHub Pages.

**Live site:** <https://andreasnissen.dev/>

## What is included

- Homepage with positioning, selected projects, and selected writing
- Five-minute Start Here route for technical and hiring reviewers, accessible from every page
- Main navigation: Start Here, Projects, Writing, and About, with a separate Contact link
- Talks, Selected Impact, and Work I Love grouped in the About section navigation
- Case studies as the primary project-card action, with demo and source links secondary
- Personal-project and employer non-affiliation disclosure on the homepage, project index, and case studies
- Evidence-led writing archive with article search, controlled topic filters, proof links, verification dates, and series navigation
- Project pages grounded in verified public repositories or owned live demos
- A clearly separated "Work I Love" collection for attributed external articles, blogs, and repositories
- A Selected Impact page that separates public proof, professional scope, and personally owned workshop material
- A reviewed workshop page with public-safe artifacts, explicit ownership boundaries, AWS learning entry points, and a personally completed shortlist of AWS-authored AI workshops
- About and Contact pages, with LinkedIn as the professional contact route, RSS, sitemap support, social metadata, 404 page, and responsive styles
- Page-specific 1200 by 630 Open Graph images generated from one reproducible visual system
- Shared GitHub profile mark used in the header, browser icon, Apple touch icon, and social metadata
- Persistent creator attribution linking to Andreas's verified GitHub profile
- Shared desktop page edges, compact collection headers, and readable detail columns with section navigation (expanded on desktop, collapsible on narrow screens)
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

For a dependency-free preview of that exact build, run `npm run dev`. It serves only `public/` on port 4173 and accepts `--host`, `--port`, and `--strictPort` for browser review environments. Rebuild with Hugo after source changes.

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

## Evidence-led article contract

Every published article states what supports the argument instead of presenting all writing as the same kind of evidence. Frontmatter provides a controlled primary topic, an evidence label, a visible evidence boundary, a verification date, at least three key points, and proof links when a public project, repository, source, or test supports the article. The shared template renders those fields before the prose and builds series navigation when `series` and `seriesOrder` are set.

Use the evidence label precisely:

- `Tested project analysis` when a public repository or deterministic test supports the claims.
- `Architecture analysis` when the article applies documented system boundaries without claiming an empirical benchmark.
- `Operating experience` when the article draws from Andreas's sustained personal workflow and avoids confidential details.
- `Source-backed explainer` when cited public sources carry the factual claims.

Do not use measured language unless the repository exposes the measurement method and result. A missing benchmark is a limitation to state, not a result to infer.

Related writing: [How I Review AI-Built Public Work Without Outsourcing Judgment](https://andreasnissen.dev/writing/reviewing-ai-built-public-work/) explains the human review standard. [What Evidence Should an AI-Generated Pull Request Carry?](https://andreasnissen.dev/writing/evidence-for-ai-generated-pull-requests/) proposes a pipeline evidence contract; it is architecture analysis, not an implemented feature of this site.

The writing index uses the controlled `primaryTopic` vocabulary from `content/writing/_index.md`. Add a new topic only when several articles need it. Free-form `tags` remain available for narrower discovery.

The private Obsidian vault remains the research backend. Public content is promoted manually into this repository after a confidentiality and claims review.

## Talks publication gate

Each public talk needs a title, question or abstract, audience, verified delivery scope, discussion path, participant outcome, and at least one inspectable artifact such as slides, a recording, an event page, code, a demo, or a related article. The page must distinguish the larger event from the material Andreas personally owned. Hypothetical formats and unreviewed drafts stay unpublished.

## Social preview images

Published articles, projects, talks, About, Talks, and Selected Impact carry page-specific 1200 by 630 PNG metadata. Run `scripts/generate-social-images.sh` after changing a title or visual label, commit the generated assets, and verify that the built HTML includes the absolute image URL, dimensions, alt text, and `summary_large_image` card type.

The homepage uses a simpler brand card with large type for small link previews. Its reviewed 1200 by 630 source is `assets/social/homepage.png`, created with AI image assistance and checked for wording, palette, and thumbnail readability. The generator copies it to `static/images/social/homepage-v2.png` and the legacy `default.png` URL. `hugo.yaml` uses the versioned URL so social crawlers can discover the replacement. When revising this card, update the source, exported copies, config URL, and alt text together. Article and project cards retain their existing generated layout.

## Evidence-ready project contract

A featured project may set `evidenceReady: true` only when its page gives a skeptical reviewer a short, verifiable path through the work. The page must include:

1. A compact set of linked proof statistics with a verification date.
2. A guided local path with prerequisites, exact actions, expected results, and a no-run fallback.
3. An accurate architecture visual that exposes the important trust boundaries.
4. A claim-to-proof matrix linking directly to source, tests, evaluations, security controls, or CI.
5. Explicit limitations that distinguish deterministic checks, model evaluation, and production readiness.

`layouts/partials/project-evidence.html` renders this shared structure from project frontmatter. Do not set the flag for a thin experiment, an unmodified fork, or a project whose public evidence no longer matches its reviewed repository head.

## Demo hosting contract

`andreasnissen.dev` is the canonical portfolio index and case-study surface even when an interactive experience runs elsewhere. Platform-native experiments may remain on ChatGPT Sites when the product surface is part of the project, and learning labs may use it for a useful zero-setup path. Those pages must set an accurate `demoLabel`, explain the deployment choice, and avoid implying OpenAI review or endorsement.

A flagship cross-provider or production-oriented demo should move to an owned or portable deployment only when that work adds inspectable engineering evidence, such as delivery automation, authentication, observability, failure handling, or operational controls. Hosting never substitutes for source, architecture, tests or evaluations, limitations, and explicit ownership.

## Curated references contract

`content/work-i-love/` is for external work Andreas follows and recommends. It is deliberately separate from `content/projects/`, which contains only work Andreas can personally substantiate.

Every reference must:

1. Link directly to the original article, blog, or repository, never an unchanged fork.
2. Name the original creator or organization.
3. Include a short, personal explanation of why the work is useful.
4. Show the creator's current publicly documented affiliation, using `Independent` when no employer is relevant.
5. Avoid language that implies authorship, contribution, or endorsement. The affiliation label is descriptive only.

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
