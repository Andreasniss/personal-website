---
title: "How I Review AI-Built Public Work Without Outsourcing Judgment"
date: 2026-08-31
description: "AI can write code, propose tests, and draft documentation. The human owner still decides what is claimed, what counts as evidence, which risks remain, and whether it ships."
primaryTopic: "Operating practice"
evidenceLabel: "Operating experience"
evidenceBoundary: "This is an operating standard demonstrated across public repositories. It does not claim independent human review, production readiness, or the absence of undiscovered defects."
lastVerified: 2026-08-31
keyPoints:
  - "Every public claim must trace to current code, tests, documentation, or live behavior."
  - "A project is one claim surface across code, tests, README, demo, and portfolio."
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
series: "Operating Agent Systems"
seriesOrder: 3
---

AI can write code, propose tests, inspect diffs, and draft documentation. It still cannot be accountable for the public claim attached to the result.

That accountability remains mine: I define what the project is for, which architecture I accept, what evidence is sufficient, which risks remain, and whether the result is ready to carry my name.

My decision rule is simple: if I cannot trace a public claim to current code, tests, documentation, or live behavior, I narrow it or remove it.

As agents complete more of a software change, this boundary keeps speed from turning into borrowed confidence.

## Start with the claim the project must support

Before implementation, I define the shortest sentence a skeptical reviewer should be able to verify.

For Runbook Relay, the claim is not “a production incident system.” It is that a deterministic WebMCP demo can expose bounded tools, keep approval human-only, fail closed before approval, and make the action trail visible.

For the Agent Reliability Lab, the claim is not “Mistral is safe” or “the application is production ready.” It is that a compact reference can demonstrate allow-listed tools, bounded retries, metadata-only telemetry, credential-free regression tests, and a deterministic evaluation contract.

The narrower claim makes the evidence testable. It also prevents the README from drifting into marketing language the repository cannot support.

## Treat the project as one claim surface

A public project appears in several places:

- implementation and configuration;
- automated tests and evaluations;
- security and limitation notes;
- repository README and metadata;
- live demo or reviewer fallback;
- website case study;
- CV, LinkedIn, and interview explanation.

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

The language should preserve those boundaries. I describe deterministic checks as deterministic checks. I name model versions and fixtures when I claim model behavior. I do not turn “another model looked at it” into “independently reviewed.”

## Make failure visible

The most useful review question is often: what happened when the safe path did not work?

For an agentic demo, I look for blocked actions, invalid tool names, malformed inputs, retry exhaustion, stale state, missing credentials, absent browser capabilities, and reset behavior. The README should tell a reviewer how to reach at least one negative path without external credentials.

Limitations should also distinguish what the project intentionally omits. A client-side approval can demonstrate interaction structure and still be insufficient for production authorization. A synthetic policy document can demonstrate grounding behavior and still say nothing about enterprise retrieval quality.

Visible limitations increase credibility because they define the boundary of the claim.

## Keep AI attribution precise

My public repositories use a short ownership statement:

I own the project intent, architecture, requirements, evaluation criteria, risk decisions, and release decisions, and I review merged changes. AI tools assist with implementation and documentation.

That statement avoids two misleading extremes. It does not hide substantial AI assistance. It also does not imply that a model owns decisions or provides human accountability.

Raw private sessions and internal reasoning do not belong in the repository. The public evidence should be the code, tests, documented decisions, and reviewed result.

## Use a release gate

Before I publish or feature a project, I expect:

1. a clean setup path from the repository;
2. deterministic tests and relevant evaluations passing;
3. security, secrets, dependencies, and public data reviewed;
4. a guided reviewer path with expected results and a fallback;
5. architecture and important control boundaries documented;
6. claims linked to proof;
7. limitations stated in direct language;
8. README, live demo, website, and repository metadata synchronized;
9. required CI and review conversations resolved;
10. enough understanding to explain and debug every major path.

The last condition is personal. If I cannot explain the architecture and failure behavior without asking the coding agent, the project is not a credible representation of my work.

## The human remains on the release decision

AI-assisted development changes how quickly implementation and review can happen. It does not remove the need for an accountable owner.

The human owner does not need to type every line. They must be able to defend every public claim, explain the major failure paths, and decide which limitations are acceptable.

That is not a ceremonial approval at the end. It is the architecture of the entire workflow.
