# The Curious Engineer design review

Reviewed 5 September 2026 against the selected dark homepage mockup.

The implementation preserves the approved hero wording, laptop/checklist/mug/paper-airplane artwork, warm serif headings, dark forest palette, teal actions, paired project/article entry points, and circular portrait. The original portrait file is used without facial alteration. Existing Start Here navigation, project evidence, and the broader portfolio remain accessible beyond the compact mockup.

## Browser evidence

Desktop viewport screenshots were inspected for the homepage hero, featured pair, About snippet, article header and brief, project verification snapshot, and 404 page. Narrow layouts were inspected using real pages embedded in 390px browser frames: homepage, Model Cellar article, Runbook Relay project, About, Work I Love, and 404. The first three report 375px content width and 375px scroll width, with no horizontal overflow (15px frame scrollbar).

Article search for `cellar` displayed one article. Search and filter controls remain semantic inputs and buttons. Focus indication was visible on the search field. A subsequent filter click hit a browser protocol timeout, so that interaction is not claimed as verified. No filter JavaScript was changed.

Screenshots were returned in the implementation conversation. Full-page capture and synthetic scrolling encountered browser protocol timeouts; viewport captures and direct anchor navigation were used instead.

## Findings and resolution

- P2: The Writing introduction delayed access to the articles. Shortened it while preserving question-based entry links, RSS, and attribution.
- P2: Footer introduction wrapped three messages into one desktop row. Changed it to a vertical reading order.
- P2: Preview server lacked an explicit WebP MIME type. Added it for the three optimized illustrations.
- No remaining observed P0/P1 issues in the inspected layouts.

## Build gates

Hugo 0.165.0 Extended. Content validation, production build, internal-reference checks, sharing metadata, JSON-LD, and machine-discovery validation run before publication. No external font, theme package, framework, or analytics dependency added. The temporary responsive review page is excluded from publication.
