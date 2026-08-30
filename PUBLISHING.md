# Publishing contract

The website owns the durable article. LinkedIn distributes a shorter version to a professional audience.

## Definition of done

An original LinkedIn post is complete only when:

- a publication-safe article exists under `content/writing/`;
- its claims and source links are current and verified;
- private, customer, and AWS-confidential details have been removed;
- the website version has been published, or is explicitly marked review-ready while the site has no live host;
- the final LinkedIn post is live; and
- the website frontmatter contains the verified LinkedIn activity URL.

Reposts, comments, reactions, and private messages are outside this contract.

## Sequence

1. Develop the argument privately.
2. Write the canonical website article in plain Markdown.
3. Run the content validator and a Hugo build.
4. Review the article on narrow and wide screens.
5. Publish the website article.
6. Derive and publish the LinkedIn post.
7. Add the live LinkedIn URL to `linkedinURL` and republish the site metadata.

Never infer publication from a draft, schedule, or prepared asset. Verify the live LinkedIn activity and the live website URL.
