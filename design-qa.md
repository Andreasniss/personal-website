# Design QA

Date: 2026-08-31

## Visual target

The existing dark LinkedIn-aligned portfolio system is the selected target: charcoal surfaces, warm ivory type, petrol teal, restrained orange, and the red heart accent. This release extends that system without changing its navigation, type scale, radius, or spacing language.

## Compared views

- Projects index before and after at desktop width
- Writing index before and after at desktop width
- Context and Control article at desktop width
- About and Work I Love structure through the deployed DOM

## Results

- Article cards now use approved LinkedIn or vault visuals, with consistent media framing and no missing images.
- The Context and Control SVG renders at its native 1080 by 1350 dimensions and retains accessible alt text.
- Public project cards use clean repository proof images; the private 7DayFocus repository is not exposed.
- Case study, live demo, repository, related article, and related project destinations are visibly distinct and keyboard-focusable.
- The About links use labeled destination cards with familiar service icons.
- Runbook Relay is titled as a WebMCP demo in the index, page title, and metadata.
- The Mistral case study uses an exact architecture visual, linked proof statistics, a guided reviewer path, a claim-to-proof matrix, and explicit limitations.
- Desktop navigation and content hierarchy remain consistent with the selected baseline.
- Hugo build, content validation, and the GitHub Actions deployment passed.

## Remaining polish

- The private 7DayFocus card intentionally has no visual proof image until an approved public-safe demo asset exists.
- Article visuals are deliberately editorial rather than forced into identical crops on detail pages.
- The Mistral project card retains its repository preview until a real screenshot can be captured from the reviewed Streamlit application. Generated interface imagery must not be used as a substitute.

final result: passed
