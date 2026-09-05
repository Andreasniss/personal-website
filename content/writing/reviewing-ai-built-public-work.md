---
title: "How I Review AI-Built Public Work Without Outsourcing Judgment"
date: 2026-08-31
description: "AI can write code, propose tests, and draft documentation. The human owner still decides what is claimed, what counts as evidence, which risks remain, and whether it ships."
primaryTopic: "Operating practice"
evidenceLabel: "Operating experience"
evidenceBoundary: "This describes my public-project review standard and links existing repository evidence. Worked review scenarios are illustrative; they are not reported incidents, a defect-detection benchmark, or a claim that every control is automated."
lastVerified: 2026-09-05
lastmod: 2026-09-05
keyPoints:
  - "Every public claim must trace to current code, tests, documentation, or live behavior."
  - "Keep generated work within review capacity, and bind checks and approval to the current revision."
  - "Automated and AI-assisted checks provide evidence; accountability remains human-owned."
proofLinks:
  - label: "Inspect the personal website repository"
    url: "https://github.com/Andreasniss/personal-website"
  - label: "Review the Agent Reliability Lab"
    url: "https://github.com/Andreasniss/Mistral-playground"
socialImage: "/images/social/reviewing-ai-built-work.png"
socialImageAlt: "How I Review AI-Built Public Work Without Outsourcing Judgment, an article by Andreas Nissen."
tags:
  - AI-assisted development
  - software quality
  - portfolio engineering
  - evaluation
origin: "website"
featured: false
draft: false
image: "/images/articles/reviewing-ai-built-work.svg"
imageAlt: "A human-owned release decision receives evidence from code, tests, security checks, documentation, and a live verification path."
repoURL: "https://github.com/Andreasniss/personal-website"
relatedArticleURL: "writing/evidence-for-ai-generated-pull-requests/"
relatedArticleTitle: "What Evidence Should an AI-Generated Pull Request Carry?"
series: "Operating Agent Systems"
seriesOrder: 3
---

An AI-built demo says an action requires approval. You approve it, click execute, and see a success receipt. The button is behaving beautifully. Can someone call the same action directly without approval?

This illustrative scenario explains where I start: the point where failure has consequences. A disabled button provides no protection if the server accepts the request.

Before I put my name on the work, I need to explain its behavior and the evidence behind it. My decision rule is simple: if I cannot trace a public claim to current code, tests, documentation, or live behavior, I narrow it or remove it.

## Start with the claim the project must support

Before implementation, I define the shortest sentence a skeptical reviewer should be able to verify.

For [Runbook Relay](/projects/runbook-relay/), I keep the claim scoped to a deterministic WebMCP demo: bounded tools, approval outside the model tool surface, enforcement in durable server state, and an inspectable action trail. Its reviewer path must make the blocked action visible as well as the approved one.

For the [Agent Reliability Lab](https://github.com/Andreasniss/Mistral-playground), the claim covers allow-listed tools, bounded retries, metadata-only telemetry, credential-free regression tests, and a deterministic evaluation contract. Its README explicitly distinguishes those checks from model-quality benchmarking. I preserve that distinction when describing the project elsewhere.

The narrower claim makes the evidence testable. It also prevents the README from drifting into marketing language the repository cannot support.

## Turn the claim into a review question

“Check the code” is too vague to be a useful review instruction. I want the intended behavior, the consequence of failure, and the boundary that should enforce it.

For the approval example, I would work through this table:

| Claim | Evidence I would inspect | Reason to stop |
|---|---|---|
| Execution requires approval | Enforcement at the server entry point and a direct unapproved request | Only the interface disables the button |
| Approval covers this proposal | Binding between approval and the exact action, arguments, and relevant state | The proposal changes while the approval remains usable |
| Approval permits one execution | Consumption or replay control and a repeated request | The same approval authorizes a second effect |
| The receipt explains the outcome | Recorded decision and observable state after a blocked or completed action | The interface reports success without evidence of the effect |

This is the inspection I would apply to that class of claim. It is not a report that every project implements every control.

The same technique works outside security. If I claim bounded retries, I inspect the exhaustion path. If I claim privacy-preserving telemetry, I inspect what enters logs when a request fails. A successful response tells me little about either boundary.

## Treat the project as one claim surface

Code, tests, documentation, the live demo, and portfolio descriptions make claims about the same project.

These surfaces can contradict each other. A repository may support one provider while the website says three. A test may cover deterministic routing while the README calls it a model-quality evaluation. A live demo may have changed since the screenshot was captured.

I review them as one system. A material code change is incomplete until the README and portfolio description still match the reviewed head.

## Separate deterministic proof from model evaluation

Different checks answer different questions.

| Evidence | What it can support |
|---|---|
| Unit and contract tests | Deterministic behavior around code boundaries |
| Static analysis and linting | Defined classes of implementation defect |
| Dependency and secret scans | Known vulnerability and exposure checks |
| Model evaluation | Behavior for a versioned set of model and task conditions |
| Human review | Judgment about intent, usefulness, risk, and public claims |
| Live verification | Whether the deployed path still matches the documented experience |

Green CI is necessary evidence. It is not independent product judgment. A second model can find issues the implementing model missed. It is still an AI-assisted check, not a human reviewer.

Name the model and fixtures when claiming model behavior. Describe another model's review as an AI-assisted check.

## When the agent writes its own tests

An implementation and its tests can agree while both misunderstand the requirement. Consider a second illustrative example: an approval expires at 12:00 UTC, and the accepted requirement says it is invalid from that instant onward.

Suppose the implementation accepts requests when `now <= expires_at`. A test copied from that condition expects approval at exactly 12:00. It passes and preserves the mistake.

The expected behavior needs to come from the accepted requirement:

| Request time | Required result | What it checks |
|---|---|---|
| 11:59:59 UTC | Approval is still valid | The ordinary allowed path |
| 12:00:00 UTC | Reject expired approval | The exact expiry boundary |
| 12:00:01 UTC | Reject expired approval | The expired path |

For this simplified example, validity requires `now < expires_at`. These are hand-worked cases, not results from a model experiment or a complete production time-handling design.

Ask who chose the expected answer. Check consequential assertions against accepted requirements or independently established reference cases. A second model can challenge a test but does not establish correctness. Changes to requirement and assertion together need review as a change of intent.

Andrew Ng makes a related point in his [guide to using coding agents](https://charonhub.deeplearning.ai/the-ai-engineering-skills-map-in-detail-using-coding-agents/): developers need to evaluate whether the tests match their aims. The expiry example shows one specific reason to do that.

## Keep generated work within review capacity

An agent can finish another change while the previous one is still waiting for review. The terminal looks productive. The reviewer has acquired a second inbox.

In his [pi talk, Mario Zechner recommends capping the generated code that needs review](https://www.youtube.com/watch?v=RjfbvDXpFls&t=1041s). My practical extension is to limit work in progress by the consequential changes a person can understand and verify, rather than by how many agents can run.

Return to the approval example. Suppose three agents change expiry handling, replay protection, and the execution endpoint at once. Each patch may look reasonable alone. Together, they could disagree about when an approval becomes invalid. Splitting the work into smaller, sequential changes lets the reviewer trace that shared behavior after each step. This is an illustrative dependency problem, not a measured comparison of agent workflows.

When changes wait longer for review, require repeated explanation, or depend on unreviewed patches, pause new dependent work. Finish the review, reduce scope, or separate the changes at a real boundary. A line-count limit alone misses the point: a one-line authorization change can deserve more attention than generated documentation.

Parallel work still makes sense for independent tasks with clear acceptance checks. The limit should follow review capacity and consequence. More generated code is useful only when someone can establish what it does.

## Review the revision that will ship

Evidence has a scope and a lifetime. A green run on an earlier commit is historical evidence. An approval for one set of arguments does not automatically cover a changed proposal.

My release standard is to identify the candidate revision, inspect the relevant checks for that revision, resolve findings, and confirm that the final change still fits the approved scope. A later edit means checking which evidence needs to be renewed. The deployed page or application then needs a live check because a successful build alone does not establish what users received.

This website offers a small, inspectable example. Its [deployment workflow](https://github.com/Andreasniss/personal-website/blob/main/.github/workflows/deploy-pages.yml) runs a content validator, a Hugo build, and a built-site validator. Those checks can establish that the site meets encoded structural requirements. They cannot establish that my architectural argument is sound or that a cited source supports the sentence attached to it.

For an article, I therefore review the source claim as well as the generated page. For a demo, I inspect a consequential negative path as well as the successful one. The evidence I ask for follows the claim I am making.

## Make failure visible

The most useful review question is often: what happened when the safe path did not work?

For an agentic demo, I look for blocked actions, invalid tool names, malformed inputs, retry exhaustion, stale state, missing credentials, absent browser capabilities, and reset behavior. The README should tell a reviewer how to reach at least one negative path without external credentials.

Limitations should also distinguish what the project intentionally omits. A session-bound server approval can demonstrate digest, version, expiry, consumption, and replay controls. It still does not prove workforce identity or human presence. A synthetic policy document can demonstrate grounding behavior and still say nothing about enterprise retrieval quality.

When a check finds a real problem, my preferred follow-through is to fix the implementation, rerun the relevant verification, and add a regression check when it can protect that failure mechanism. I also re-read the public description. Sometimes the honest fix is a narrower claim because the broader behavior has not been built or evaluated.

## Keep AI attribution precise

My public repositories use a short ownership statement:

I own the project intent, architecture, requirements, evaluation criteria, risk decisions, and release decisions, and I review merged changes. AI tools assist with implementation and documentation.

Raw private sessions and internal reasoning do not belong in the repository. The public evidence should be the code, tests, documented decisions, and reviewed result.

## Decide what the evidence permits

I separate three outcomes:

| Outcome | When I use it |
|---|---|
| Release within the stated scope | Required checks pass, material findings are resolved, and I can defend the remaining limitations |
| Narrow the claim or scope | The work supports a useful, smaller promise and that boundary is explicit across the public surfaces |
| Hold the release | Required evidence is missing, a material defect remains, or I cannot explain the consequential behavior |

Narrowing a claim cannot excuse a broken control that the remaining scope still requires. A missing model-quality benchmark may be an honest limitation of a deterministic learning lab. An approval bypass contradicts a demo whose purpose is controlled execution.

## Use a release gate

Before I publish or feature a project, I expect:

- a reproducible setup and guided reviewer path, including expected results and a fallback;
- passing required checks and relevant evaluations, with security, secrets, dependencies, and public data reviewed;
- documented architecture, proof for the claims, and explicit limitations;
- consistent README, demo, website, and repository metadata, with required review conversations resolved;
- enough understanding to explain and debug every major path.

The last condition is personal. If I cannot explain the architecture and failure behavior without asking the coding agent, the project is not a credible representation of my work.

## The human remains on the release decision

The owner must defend the public claims, explain the failure paths, and decide which limitations are acceptable. Those responsibilities remain with them even when an agent writes the code.

My companion article, [What Evidence Should an AI-Generated Pull Request Carry?](/writing/evidence-for-ai-generated-pull-requests/), proposes how a pipeline could preserve the revision, checks, findings, and scoped approvals behind that decision. It describes an architecture to implement and evaluate; this article describes the review responsibility that architecture should support.
