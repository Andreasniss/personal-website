# Publishing contract

The website owns the durable article. LinkedIn and X distribute channel-native versions of the same verified argument.

| Surface | Role | Typical shape |
|---|---|---|
| Website | Canonical source | Complete argument, evidence, diagrams, durable links, and updates |
| LinkedIn | Professional distribution and conversation | One sharp thesis, practical lesson, visual when useful, and a discussion prompt |
| X | Fast technical distribution | A concise post, focused thread, or X Article chosen for the idea |

Reuse the argument and evidence. Do not cross-post identical text by default. Each version may differ in structure, length, hook, and call to action.

Set `origin: "website"` for new canonical articles. Preserve `origin: "linkedin"` only for verified legacy imports so the public page describes their publication history accurately.

## Title gate

Treat the title and description as one editorial pair. The title must name the concrete subject and give the intended reader a truthful reason to open the article through a tension, consequence, decision, or practical payoff. It must make sense without the body, resolve to the article's actual argument, and stay inside the evidence boundary.

The description should explain the scope or evidence instead of repeating the title. Reject a title that depends on a vague metaphor, a generic category label, an unsupported superlative, or curiosity that the article does not satisfy. If the intended reader cannot tell what they will learn and why it matters from the title and description together, revise them before creating social derivatives.

## Accessible technical teaching

Apply this editorial pass to new articles and substantive rewrites:

1. Name the reader's question and the decision the article helps them make.
2. State the conclusion early and introduce one concrete example before abstract terminology. Reuse that example as the argument develops.
3. Explain a mechanism through observable behavior: what was requested, what could fail, what the system checks, and what the reader should inspect.
4. Define unfamiliar terms at first use. Keep one main idea per paragraph and remove repeated statements of the thesis.
5. Give one reusable decision rule, an important exception, and a useful next step. Keep evidence boundaries beside the claims they qualify.
6. Label reported experience, sourced observation, inference, and illustrative numbers accurately. Never turn an influential author's experience into a universal benchmark.
7. Make the article useful on its own. A LinkedIn adaptation carries one complete lesson; the website provides deeper evidence and alternatives.

This teaching direction is informed by [Andrew Ng's writing](https://www.andrewng.org/writing), particularly his [coding-agent workflow explanation](https://charonhub.deeplearning.ai/the-ai-engineering-skills-map-in-detail-using-coding-agents/). Adapt the instructional mechanism in Andreas's voice. It is an editorial preference, not a demonstrated engagement lift.

## Website discovery principles

The review of [Andrew Ng's homepage](https://www.andrewng.org/), [Writing](https://www.andrewng.org/writing), and [Courses](https://www.andrewng.org/courses) on 5 September 2026 supports these choices for this portfolio:

- Keep the existing reader-first homepage and five-minute project tour. Ng's biography-led homepage serves an established public figure; Andreas's site should help a new reader understand and inspect his work immediately.
- Offer a small number of question-led reading routes, connecting an explanation to a relevant demo or evidence page. Use the existing writing index and topic filters before adding a new navigation section.
- Keep selected starting points distinct from chronological discovery. Ng's Writing page emphasizes the latest letter; its Courses page separates featured foundations from recent offerings. Here, curated reading routes can sit above the dated article archive.
- Explain each destination's practical value in one sentence. Preserve the existing clear separation between Andreas's projects and attributed external work.
- Give returning readers an obvious subscription route using the existing RSS feed. A new newsletter, course platform, or personal AI avatar requires a separately justified product decision.
- Preserve the current visual identity and evidence depth. Sparse hierarchy and readable explanations are the transferable qualities; a visual imitation or biography expansion is not required.

These are source-backed design judgments, not usability-test results. Check an unfamiliar reader's ability to choose an article and explain its decision rule before claiming improved comprehension or conversion.

## Article discussion links

When an article's LinkedIn post is live, open and verify that exact post, confirm it belongs to Andreas and corresponds to the article, and add its canonical post URL to the article's `linkedinURL` frontmatter. Use the exact post permalink, never a profile, activity feed, search result, draft, or scheduled-post URL. Do this as part of the same publishing session, even if another channel is still pending.

Republish the website after recording the URL. The shared article template then adds this invitation at the bottom, after the article and related reading: "Have a question or a different perspective? Join the conversation on LinkedIn." The linked words must lead directly to the verified post so readers know where to leave a comment.

Show the LinkedIn invitation only when `linkedinURL` exists. Keep social-version labels out of cards and article headers. Preserve original-publication attribution for verified LinkedIn imports at the bottom. If `xURL` also exists, show it as a secondary discussion link there.

Before completing the publishing task, verify the deployed article contains the invitation, its link opens the intended live post, and no invitation appears for an article without a verified LinkedIn URL. A prepared or scheduled post does not qualify. If the post is deleted or unavailable, remove or correct its URL and invitation instead of leaving a broken discussion route.

## Definition of done

A substantive original publishing package is complete only when:

- a publication-safe article exists under `content/writing/`;
- its title and description pass the title gate;
- its page-specific 1200 by 630 sharing image matches the final title and argument;
- its claims and source links are current and verified;
- private, customer, and AWS-confidential details have been removed;
- the website version has been published, or is explicitly marked review-ready while the site has no live host;
- the final LinkedIn version is live;
- the final X version is live; and
- the website frontmatter contains both verified social URLs in `linkedinURL` and `xURL`; and
- the deployed article ends with a working discussion invitation linked to its exact LinkedIn post.

Reposts, comments, reactions, replies, and private messages are outside this contract.

## Sequence

1. Develop the argument privately.
2. Write the canonical website article in plain Markdown.
3. Run the content validator and a Hugo build.
4. Review the article on narrow and wide screens and inspect its Open Graph and X card metadata.
5. Publish the website article.
6. Derive distinct LinkedIn and X versions from the verified argument.
7. Publish each version in its channel-native format.
8. After each social version goes live, verify its exact post URL and record it in `linkedinURL` or `xURL`.
9. Republish the site and verify the article-bottom discussion invitation and its exact destination.

Never infer publication from a draft, schedule, or prepared asset. Verify the live website, LinkedIn, and X URLs.
