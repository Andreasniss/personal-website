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
- the website frontmatter contains both verified social URLs in `linkedinURL` and `xURL`.

Reposts, comments, reactions, replies, and private messages are outside this contract.

## Sequence

1. Develop the argument privately.
2. Write the canonical website article in plain Markdown.
3. Run the content validator and a Hugo build.
4. Review the article on narrow and wide screens and inspect its Open Graph and X card metadata.
5. Publish the website article.
6. Derive distinct LinkedIn and X versions from the verified argument.
7. Publish each version in its channel-native format.
8. Add the live URLs to `linkedinURL` and `xURL`, then republish the site metadata.

Never infer publication from a draft, schedule, or prepared asset. Verify the live website, LinkedIn, and X URLs.
