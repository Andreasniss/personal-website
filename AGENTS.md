# AGENTS.md

Shared instructions for this repository: Andreas Nissen's personal Hugo
portfolio and writing site, deployed to GitHub Pages at
<https://andreasnissen.dev/>. Read this file first.
`README.md` owns what the site is and how to run it locally; `PUBLISHING.md`
owns the LinkedIn dual-publication contract. Do not duplicate their content
here; extend them instead if a rule changes.

## Stack and constraints

- Hugo Extended, pinned in `.github/workflows/deploy-pages.yml`
  (`HUGO_VERSION`). Keep the local dev instruction in `README.md` and the
  CI pin in sync, and use the newest stable Hugo release when bumping either.
  Check `git ls-remote --tags --refs https://github.com/gohugoio/hugo` for
  the current latest tag before assuming a version is behind.
- No theme, no JS framework, no analytics, no CMS. One small vanilla CSS file
  (`assets/css/main.css`) and one small vanilla JS file (`assets/js/webmcp.js`,
  progressive enhancement only, see below). Keep it that way; a new
  dependency needs a real, user-visible reason.
- No em dashes anywhere in the repo's text, markup, or config files. The
  content validator (below) fails the build on one. Use a comma, colon, or
  period instead.

## Repository layout

```text
content/          Markdown source, one directory per section
  about/           _index.md only (no children)
  projects/        _index.md plus one file per project
  talks/           public direction index plus staged talk drafts
  work-i-love/     _index.md plus one file per curated external reference
  writing/         _index.md plus one file per article
layouts/           Hugo templates (see "Templates and output formats")
assets/css/        Single stylesheet, processed via Hugo Pipes (minify+fingerprint)
assets/js/         WebMCP progressive-enhancement script, same pipeline
static/            Favicon, profile icons, copied as-is
archetypes/        `hugo new` scaffold (default.md)
scripts/           check-content.mjs, the CI content validator (Node, no deps)
```

## Content frontmatter contracts

Every content file needs `title` and `description` in frontmatter (the
validator enforces this). Section-specific requirements:

- **`content/writing/*.md`** (excluding `_index.md`): `date`, `tags` (list),
  `draft`, `featured`, and `origin` (`"website"` for a new canonical article,
  `"linkedin"` reserved for verified legacy imports; the validator rejects
  any other value). Optional `linkedinURL` must match
  `^https://www\.linkedin\.com/feed/update/urn:li:activity:\d+/$` and optional
  `xURL` must match a live X post or Article URL; set either only once that
  version is actually live, per `PUBLISHING.md`. An `origin: "linkedin"`
  article must carry `linkedinURL`. Body must be 500+ words (the validator
  counts words after stripping frontmatter): this is the launch-article bar,
  not a floor for every edit.
- **`content/projects/*.md`**: `role`, `year`, `weight` (controls display
  order via `.ByWeight`), `featured`, `statusLabel`, `tags`. Only link
  `repoURL`/`demoURL` that are actually live and yours. An evidence-led case
  study sets `evidenceReady: true` and provides `lastVerified`, `proofStats`,
  `reviewerPath`, `reviewerFallback`, `reviewerFallbackURL`,
  `architectureImage`, `architectureAlt`, `architectureCaption`,
  `evidenceRows`, and `limitations`. The validator checks that contract and
  the architecture asset. Keep every claim tied to the reviewed project head.
- **`content/talks/*.md`**: `format`, `weight`, an explicit `draft` value, and a complete title, question or abstract, audience, verified delivery scope, discussion path, participant outcome, and inspectable public artifact. Keep unreviewed or hypothetical material in draft. A published page must distinguish the larger program from the material Andreas personally built and delivered.
- **`content/work-i-love/*.md`**: `creator`, `format`, `affiliation`,
  `sourceURL` (must be `https://...`), `why`, `weight`. `affiliation` names
  the creator's current publicly documented employer or `Independent`.
  `sourceURL` must not point at a
  `github.com/Andreasniss/...` fork; this section is for external work
  Andreas did not author. See the curated references contract in
  `README.md` before adding one.

Use `hugo new content/<section>/<slug>.md` to scaffold from the archetype.

Every article, project, talk, About page, Talks index, and Selected Impact page carries a page-specific 1200 by 630 PNG in `socialImage` plus useful `socialImageAlt`. Generate the current visual system with `scripts/generate-social-images.sh`; do not replace a real product screenshot with generated interface imagery.

**Renaming a page or project is not a Markdown-only edit.** The name is also baked into generated and hand-drawn assets, and a rename that stops at the text layer leaves a reader looking at the old name on the evidence itself. Sweep, in this order: frontmatter `title`, every alt and caption string, cross-references in other sections, the visible heading and `<title>` inside any hand-authored SVG under `static/images/`, the matching `make_card` line in `scripts/generate-social-images.sh`, and the `image` card preview, which `project-card.html` renders on the homepage and the section grid regardless of `hideDetailImage`. A repository social preview used as `image` carries the repository name as its largest text, so a rename that leaves the repository alone strands the old identity on the renamed card; where no honest replacement exists, drop the field rather than fabricate one, since it is optional and decorative. Update the generator before regenerating, because it is the authoritative source for the card: fixing only the PNG leaves the old title in place to be silently restored by the next routine regeneration. Then rerun the generator and confirm it changed only the cards you expected. Keep a provider or vendor name wherever it states a fact about what the project supports; rename the entity, not the evidence.

## Templates and output formats

Beyond the normal HTML templates in `layouts/_default/` and
`layouts/partials/`, this site publishes three agent-facing and machine-
facing output formats, defined in `hugo.yaml` under `outputFormats` and
`outputs`:

| Output | Kind | Template | Produces |
|---|---|---|---|
| `MARKDOWN` | page | `layouts/_default/single.markdown.md` | `.../index.md` next to every published article, project, and approved talk page, rendered from `.RawContent` (the authored Markdown, unconverted) |
| `LLMSTXT` | home | `layouts/index.llmstxt.txt` | `/llms.txt`, a build-time index of every page, following the `llms.txt` convention |
| `JSON` | home | `layouts/index.json.json` | `/index.json`, the full content index (title, url, markdownUrl, section, description, date, tags) consumed by both `llms.txt`'s cross-reference and the WebMCP tool below |

`head.html` also emits JSON-LD (`Person` on home and about, `BlogPosting` on
writing pages). It is built via a single `dict` to `jsonify` to `safeJS`
pipeline. Do not hand-assemble JSON by interpolating several separate
`jsonify` calls into a literal `{ "key": {{ ... }} }` skeleton inside a
`<script>` block: Go's `html/template` auto-escapes script context and will
double-encode each value into a broken JS string. Always build one `dict`
(or `slice`), pipe the whole thing through `jsonify (dict "indent" "  ")`,
then `| safeJS`.

`assets/js/webmcp.js` registers a single read-only `document.modelContext`
tool (`search_site`) that searches `/index.json` client-side. It is
feature-detected (`if (!("modelContext" in document)) return`), so it is a
no-op everywhere WebMCP is not implemented. WebMCP is currently a draft
Community Group proposal with only a Chrome origin trial, not a shipped
standard. Fetches happen lazily inside the tool's `execute()`, not on page
load. If you add a new content section that should be discoverable, add it
to the list in both `layouts/index.json.json` and
`layouts/index.llmstxt.txt`, and to the WebMCP tool's `section` enum in
`assets/js/webmcp.js`.

When adding a new section, decide its `outputs` entry in `hugo.yaml`
deliberately. The `page` kind currently gets `[HTML, MARKDOWN]` site-wide, so
a new page-kind section gets the Markdown alternate for free; `home` and
`section` kinds need their output list extended explicitly if a new format
should apply there too.

## Content validator (`scripts/check-content.mjs`)

Runs in CI on every push and pull request (`node scripts/check-content.mjs`,
no dependencies, plain Node). Run it locally before pushing:

```sh
node scripts/check-content.mjs
```

It checks, across the whole repo and not just `content/`:

- A fixed list of required files exists (core layouts, icons, section
  indexes; see the script's `required` array before deleting or renaming
  one).
- No unfinished or stand-in copy in any `.md`/`.html`/`.css`/`.yaml`/`.json`/
  `.mjs`/`.svg` file. The script's own regex names the exact banned tokens
  (an unfinished-task marker, a lorem-ipsum stand-in, an example domain, and
  a generic fill-in-later word); read the script rather than duplicating the
  list here, since a duplicate invites drift and this file is itself
  scanned by the same check.
- No em dash in any of those files (the validator script itself is exempt).
- Any `target="_blank"` link also carries a `noreferrer` value in `rel`.
- The content frontmatter contracts above: title and description everywhere,
  the per-section fields, article word count, `origin`/`linkedinURL`/`xURL`
  shape, and work-i-love's rule against linking an Andreas-owned fork.
- CSS brace balance in `assets/css/main.css`.
- Balanced Hugo template delimiters in every file under `layouts/`, that
  every referenced partial resolves to a real file, and that no template
  passes a root-relative string (starting with a leading slash) into the
  `relURL` pipe, since that double-prefixes the `baseURL` subpath. Use a
  path relative to the site root instead, for example `"index.json" |
  relURL`, not a leading-slash form piped the same way.
- The footer keeps the creator attribution string and all three destination
  labels (GitHub profile, LinkedIn, RSS feed). Add Andreas's X profile only
  after he confirms that it has a professionally representative body of
  substantive personal posts. Keep the site repository
  discoverable through GitHub metadata rather than adding it as a footer
  destination.
- `hugo.yaml` keeps its production `baseURL` and `sourceURL` values verbatim.

A failure here is a hard stop before Hugo's own build even runs. If you are
touching `layouts/partials/footer.html`, the `hugo.yaml` `params` block, or
any template's action delimiters, run this script before pushing.

## Local build and verification

```sh
hugo server --buildDrafts     # local dev server at :1313
hugo --gc --minify            # production-equivalent build, matches CI
node scripts/check-content.mjs
```

Before pushing a change to templates, `hugo.yaml`, or anything under
`assets/`, do both: the content validator above, and a full `hugo --gc
--minify` build with the exact Hugo version pinned in
`.github/workflows/deploy-pages.yml`. A newer local Hugo can silently accept
syntax the pinned CI version rejects, or the reverse. If validating in a
sandboxed or offline environment, download that exact release directly:

```sh
curl -sSL -o hugo.tar.gz "https://github.com/gohugoio/hugo/releases/download/v<HUGO_VERSION>/hugo_extended_<HUGO_VERSION>_linux-amd64.tar.gz"
tar -xzf hugo.tar.gz hugo
```

For anything touching the JSON-LD or WebMCP script, also open the built
`index.html` in a browser (or serve `public/` locally, noting the site's
non-root `baseURL` subpath) and confirm there are no console errors and that
each `<script type=application/ld+json>` block holds valid JSON. The double-
escaping failure mode above is silent in a Hugo build; it only shows up as
broken JSON at runtime.

## Deployment

`.github/workflows/deploy-pages.yml`: every push to `main` builds with Hugo
Extended, runs `node scripts/check-content.mjs`, and deploys `public/` to
GitHub Pages. Pull requests run the same build and validator but do not
deploy. There is no separate staging environment; `main` is what is live.

## Publication and content contracts

`README.md` owns the curated references contract (`work-i-love` versus
`projects`) and the general content structure. `PUBLISHING.md` owns the
LinkedIn dual-publication definition of done. Read both before adding or
substantially editing content, not just code. In short: never claim a
website article or LinkedIn post is live without verifying the live URL, and
never let `work-i-love` imply authorship of someone else's work.

## Safety

This is a public, published personal site under Andreas's name; treat every
content change as visible immediately once merged to `main`. Never commit
AWS-confidential, customer, or other private detail (this site is explicitly
the public-safe side of a private research pipeline, see `README.md`). Do
not invent claims, past speaking engagements, or metrics. Confirm before
force-pushing, rewriting history, or removing content that is not obviously
stale.
