---
title: "Skill Routing Is a Reliability Problem"
date: 2026-08-31
description: "A correct skill that activates for the wrong request is still a system failure. Routing needs explicit boundaries, negative cases, and regression tests."
primaryTopic: "Evaluation"
evidenceLabel: "Operating experience"
lastVerified: 2026-08-31
keyPoints:
  - "Skill descriptions are routing interfaces and should be tested like interfaces."
  - "Negative and overlap cases reveal failures that happy-path prompts miss."
  - "Routing evaluation must include freshness, permissions, and the cost of a wrong activation."
proofLinks:
  - label: "Read the eight operating rules"
    url: "/writing/eight-rules-ai-agent-skill-library/"
socialImage: "/images/social/skill-routing-reliability.png"
socialImageAlt: "Skill Routing Is a Reliability Problem, an article by Andreas Nissen."
tags:
  - agent skills
  - routing evaluation
  - regression testing
  - agent reliability
origin: "website"
featured: true
draft: false
image: "/images/articles/skill-routing-reliability.svg"
imageAlt: "A routing evaluation sends positive, negative, overlap, and stale cases through a skill selector before execution."
relatedArticleURL: "/writing/eight-rules-ai-agent-skill-library/"
relatedArticleTitle: "8 Rules for Running an AI Agent Skill Library"
series: "Operating Agent Systems"
seriesOrder: 2
---

A skill can contain excellent instructions and still make the agent less reliable.

If it activates for the wrong request, competes with a nearby skill, loads stale policy, or assumes permissions the task does not grant, the failure begins before the workflow runs.

That makes skill routing an evaluation problem.

## The description is an interface

Most agent harnesses select a skill before loading its full instructions. The selector often sees a name and short description, then decides which deeper workflow deserves context.

The description therefore acts like an API surface. It should say which user signals qualify, which nearby cases do not, and what boundary separates this skill from another owner.

Vague descriptions create hidden coupling. “Use for writing” may attract emails, documentation, social posts, résumé editing, and code comments even when each domain has different evidence and publication rules.

Long descriptions are not automatically better. A description should carry the few distinctions that change routing.

## Test more than positive prompts

A basic routing test asks whether an obvious request selects the intended skill. That is necessary and insufficient.

A useful evaluation set includes four types of cases:

| Case | Question |
|---|---|
| Positive | Does a clear in-scope request select the skill? |
| Negative | Does a similar out-of-scope request avoid the skill? |
| Overlap | When two skills could apply, does ownership and sequence remain correct? |
| Stale or unavailable | Does the system fail clearly when a required owner or tool cannot be loaded? |

Negative cases are especially valuable. A document skill should not activate for a request to summarize text already in the conversation. A travel skill should not own a generic geography fact. A Gmail workflow should not activate merely because an email address appears in a draft.

The cost of a false positive can exceed the cost of a missed skill. A wrong activation may load sensitive context, impose irrelevant rules, or introduce an external-action path the user never requested.

## Define the expected route, not exact wording

Routing evaluations should check observable decisions:

- selected skill or skills;
- selection order when several owners are necessary;
- which supporting references were loaded;
- whether the system requested missing authority at the correct boundary;
- whether an unrelated owner remained inactive;
- whether the final workflow stayed inside scope.

Avoid tests that require the agent to repeat a particular sentence or heading. They create brittle compliance without proving the routing decision is correct.

## Include permissions in the routing model

Routing is not only topical classification.

“Review this email” and “send this email” share content and require different authority. “Assess this repository” permits inspection. “Merge the fix” permits a defined external mutation only after its gates pass.

The selected workflow should preserve that distinction. A read-only request must not silently enter a write-capable path because the same application is involved.

This is why high-risk skills need explicit action boundaries in addition to topic triggers.

## Freshness is part of reliability

A correctly routed skill can still produce the wrong result when its referenced policy or tool contract is stale.

Track which files and external interfaces the skill owns. Validate that required references exist and that duplicated rules have not drifted. Review high-impact skills when the connected product changes, not only on a fixed calendar.

Freshness should influence the evaluation outcome. A skill that cannot load its canonical owner should fail clearly or use a documented bounded fallback. It should not continue with silent assumptions and report success.

## Measure consequences, not only accuracy

Selection accuracy is useful, and it treats every mistake as equal. They are not.

Confusing two low-risk formatting helpers is different from routing a read-only request into a workflow that can publish, delete, or send data. Weight cases by consequence:

- context cost from unnecessary skill loading;
- user friction from irrelevant questions;
- incorrect action ownership;
- privacy exposure;
- external side-effect risk;
- failure to apply a required safety or evidence gate.

The evaluation score should make severe false positives visible instead of averaging them into a healthy-looking percentage.

## A practical routing harness

A small public-safe harness can represent each case with:

```yaml
request: "Review the repository and explain any release blockers."
expected_skills:
  - public-projects
forbidden_skills:
  - email-sender
authority: "read-only review"
expected_boundary: "Do not merge or publish"
risk_weight: 2
```

The runner can present each request to a clean agent context, record selected skills and tool calls, and compare the observed route with the case contract. Failures should be reviewed by category rather than reduced to one score.

The harness described here is a design direction, not a published benchmark. A credible release should include sanitized skills, deterministic fixtures where possible, model and harness versions, repeated runs for probabilistic routing, and examples of corrected failures.

## Keep the library small enough to reason about

Routing reliability declines when several skills describe the same purpose with slightly different language. Merging overlapping owners often improves behavior more than rewriting their descriptions again.

The operating rule remains simple: a skill should earn its context and authority on every request.

The right skill, selected for the right reason, with the right freshness and permission boundary, is part of the system's reliability contract.
