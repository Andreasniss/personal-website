---
title: "The Cheapest AI Model Is Not Always the Cheapest System"
date: 2026-08-31
description: "The cheapest model is not always the cheapest AI system. Agent cost spans tool definitions, selection, results, round trips, and recovery."
primaryTopic: "Agent architecture"
evidenceLabel: "Tested project analysis"
evidenceBoundary: "The public gate measures serialized UTF-8 bytes and call count, not model tokens or end-to-end agent performance. Tool selection, latency, retries, and tokens per verified outcome remain unmeasured."
lastVerified: 2026-09-05
lastmod: 2026-09-05
keyPoints:
  - "Measure cost per verified outcome, not cost per token."
  - "Tool definitions, results, retries, and caching all affect the cost of completing a task."
  - "Reducing tokens must not remove the contracts that keep tool use reliable."
proofLinks:
  - label: "Inspect a bounded five-tool interface"
    url: "https://github.com/Andreasniss/runbook-relay-webmcp"
  - label: "Review the deterministic interface budget"
    url: "https://github.com/Andreasniss/runbook-relay-webmcp/blob/main/docs/agent-efficiency.md"
  - label: "Inspect the efficiency regression tests"
    url: "https://github.com/Andreasniss/runbook-relay-webmcp/blob/main/tests/agent-efficiency.test.mjs"
  - label: "Read the related tool-interface analysis"
    url: "/writing/screen-use-vs-webmcp/"
socialImage: "/images/social/hidden-token-tax.png"
socialImageAlt: "The Cheapest AI Model Is Not Always the Cheapest System, an article by Andreas Nissen."
tags:
  - token efficiency
  - MCP
  - tool design
  - AI cost
origin: "website"
featured: true
draft: false
image: "/images/articles/hidden-token-tax.svg"
imageAlt: "The total cost of an agent tool path is composed of definitions, selection, arguments, results, round trips, and recovery."
relatedProjectURL: "/projects/runbook-relay/"
relatedProjectTitle: "Runbook Relay WebMCP Demo"
series: "Reliable Agent Systems"
seriesOrder: 6
---

The model is cheap. Its repair habit is less economical.

Tool definitions, selection errors, oversized results, extra round trips, and recovery all add cost. Fewer tokens in one request can still mean a more expensive completed task.

Use one denominator: cost per verified outcome.

A shorter prompt can save money or create enough retries to erase the saving. A longer contract may produce a valid call sooner. Only the full task cost can settle that comparison.

## The cost has several layers

An agent task can consume model context in at least six places:

1. **Tool definitions:** names, descriptions, input schemas, output schemas, and examples.
2. **Selection:** reasoning needed to distinguish similar tools and choose the correct one.
3. **Arguments:** structured parameters generated for the call.
4. **Results:** data returned to the model for the next decision.
5. **Round trips:** repeated model calls across a multi-step workflow.
6. **Recovery:** validation errors, retries, clarification, and alternate routes.

These costs interact. A shorter description can save input tokens and make the tool easier to misunderstand. A single broad tool can reduce round trips and increase the number of optional parameters, permissions, and failure modes the model must navigate.

## Measure work completed, not responses produced

A smaller response is useful only if the agent still reaches the required outcome. A compact result that causes another lookup, a malformed call, or a retry can cost more than a longer result that resolves the decision once.

The denominator matters. For a repeated evaluation fixture, calculate:

`model tokens per verified outcome = total model input and output tokens / verified outcomes`

That is a usage measure, not a price comparison. For cost, weight uncached input, cached input, and output tokens by the applicable rates, then add paid tool calls and other run costs. Include failed attempts in the numerator. Track human review effort alongside the automated cost.

Consider an illustrative batch of 100 identical task requests under two configurations. A costs €6 and completes 60; B costs €8 and completes 95. Automated cost per verified completion is €0.10 for A and about €0.084 for B. These are invented numbers to show the arithmetic, not results from my demo. The comparison still needs the same quality floor, task mix, and safety requirements.

The outcome must be checked against application state, not inferred from a fluent final message. In a read workflow, success may mean returning the correct record. In a consequential workflow, success may mean completing an approved action. In a negative test, the successful outcome may be rejecting an unapproved action and recording the reason.

Report legitimate task completion separately from successful safety denials. Otherwise a system that refuses everything could look efficient on a suite with many negative cases. Keep the task mix fixed and report completion rate beside cost, so a route cannot improve its score merely by abandoning difficult work.

If no run reaches the verified outcome, the efficiency measure is undefined. A failing system cannot look efficient merely because it stops early.

[Anthropic's agent evaluation guidance](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents) recommends tracking task outcomes alongside turns, tool calls, token usage, latency, and errors. That combination is more useful than a token total alone because it reveals whether lower usage came from a better interface or from incomplete work.

## Keep the information that prevents mistakes

Cutting schemas, descriptions, or examples can increase malformed calls and wrong-tool selection. Test the smallest contract that still supports reliable selection and valid execution. Prompt size alone cannot tell you where to stop.

## Expose fewer tools at a time

Selective tool exposure is one option to test when a large catalog consumes substantial context.

Expose the tools relevant to the task through a routing layer. This may reduce context and selection errors, but hiding a tool does not revoke access; the service must still authorize calls. Include routing overhead and measure actual billing after caching or deferred loading.

The router itself needs a contract. It should use stable task categories, record why a tool set was selected, and fail safely when the request spans several domains. Dynamic exposure should not become an invisible permission escalation mechanism.

## Choose granularity around decisions

Tool granularity should match a meaningful application decision.

Very granular tools make every backend step visible. They can also force the model through many sequential calls and require it to manage intermediate state. Very broad tools reduce round trips. They may hide important policy and approval boundaries inside one operation.

Runbook Relay deliberately separates read, compare, stage, execute, and reset. That is not the minimum number of calls. It is the set I chose to keep investigation, proposal, execution, and reset visible as separate decisions, with approval on the page. I have not compared alternative granularities.

A production workflow tool can still perform several internal service calls. The important boundary is whether the external operation has one coherent intent, authorization decision, and result.

## Return less, with stronger structure

Tool results often dominate context after execution. Raw API responses include fields the model does not need, repeated metadata, verbose descriptions, and large documents.

An application-owned adapter should return the smallest evidence set required for the next decision. Useful patterns include:

- stable identifiers and typed status values;
- selected fields instead of whole resource objects;
- pagination and explicit continuation;
- summaries linked to retrievable source records;
- error codes with actionable recovery guidance;
- provenance and freshness fields when the result informs a decision.

Truncation without structure is risky. The model needs to know what was omitted and how to request the next slice.

The [Model Context Protocol specification](https://modelcontextprotocol.io/specification/2026-07-28/server/utilities/pagination) uses opaque cursors and `nextCursor` for list operations such as tool and resource discovery. That does not automatically paginate an individual tool's business result. An application returning incident records needs its own explicit continuation contract.

## Count latency and failures with tokens

A design that saves tokens and adds three round trips may feel slower and cost more operationally. A compact tool that frequently fails validation can create more model usage than a longer, clearer schema.

Measure the complete task:

| Metric | Why it matters |
|---|---|
| Billed definition tokens | Context cost after provider caching and loading behavior |
| Calls per completed task | Orchestration and latency cost |
| Result tokens | Context added after each tool |
| Validation failures | Cost of an unclear or over-broad contract |
| Task success | Whether savings preserve the required outcome |
| Policy violations | Whether optimization weakened control |
| End-to-end latency | What the user experiences |

Publish the model, tokenizer, tool set, task fixture, run count, and failure examples with any result. Without that context, a token number is difficult to compare or reproduce.

## A deterministic budget in Runbook Relay

I added a structural efficiency gate to Runbook Relay's blocked-before-approval proof. It measures the serialized five-tool catalog plus the inputs and structured results for the four-call path that reads the incident, compares options, stages one mitigation, and verifies that execution is blocked without human approval.

The fixture is dated 1 September 2026. Rerunning its measurement on 5 September reproduced:

| Structural measure | Result | Budget |
|---|---:|---:|
| Tool-definition payload | 1,622 UTF-8 bytes | 2,400 bytes maximum |
| Four structured results | 1,172 UTF-8 bytes | 1,800 bytes maximum |
| Tool calls to the verified outcome | 4 | 4 maximum |
| Expected policy outcome | Blocked | Must be blocked |

The [measurement script](https://github.com/Andreasniss/runbook-relay-webmcp/blob/f14e9c8bd431f0b7087c97f4ed98a59fddd79eb7/scripts/measure-agent-efficiency.mjs), [fixture](https://github.com/Andreasniss/runbook-relay-webmcp/blob/f14e9c8bd431f0b7087c97f4ed98a59fddd79eb7/tests/fixtures/agent-efficiency.json), and [regression tests](https://github.com/Andreasniss/runbook-relay-webmcp/blob/f14e9c8bd431f0b7087c97f4ed98a59fddd79eb7/tests/agent-efficiency.test.mjs) are pinned to the reviewed revision, `f14e9c8`.

These are bytes, not tokens. The gate is deliberately tokenizer-independent and catches interface growth before a model is involved. It does not prove tool-selection accuracy or browser-agent efficiency. The repository now includes a 50-task live-model harness that captures provider-reported usage, latency, retries, policy grades, and final-state evidence. No completed live-model result is published in the repository, so no model performance result is claimed here.

## Use caching and routing where they preserve meaning

Stable tool definitions may benefit from provider-supported prompt caching. Repeated read-only results may benefit from application caching when freshness requirements allow it. Smaller models may handle classification or tool routing before a stronger model handles the complex decision.

Each optimization changes an assumption. Cache keys need to include the tool version and policy context. A routing model needs its own evaluation set. A stale result must remain visibly stale.

## Start with one measurable change

Change the largest observed cost source and rerun the same tasks. Keep the change only if the complete route costs less while meeting the same quality and policy requirements.

Publish the unsuccessful attempts with the savings. That is what lets a reader distinguish an efficient system from a cheap-looking request.
