---
title: "The Hidden Token Tax of Agent Tools"
date: 2026-08-31
description: "Tool cost begins before execution. Definitions, selection, results, round trips, and failure recovery all consume context and time."
primaryTopic: "Agent architecture"
evidenceLabel: "Tested project analysis"
evidenceBoundary: "The public gate measures serialized UTF-8 bytes and call count, not model tokens or end-to-end agent performance. Tool selection, latency, retries, and tokens per verified outcome remain unmeasured."
lastVerified: 2026-09-01
keyPoints:
  - "Every exposed tool adds recurring context before the user request is solved."
  - "Reducing tokens must not remove the schemas and descriptions that keep tool use reliable."
  - "Measure the complete task path: definitions, calls, results, retries, latency, and correctness."
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
socialImageAlt: "The Hidden Token Tax of Agent Tools, an article by Andreas Nissen."
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

The token cost of a tool-using agent starts before it calls a tool.

The model first needs to learn which tools exist, what each one does, which inputs are valid, and how their results should be interpreted. It then spends tokens selecting a tool, constructing arguments, reading the result, and deciding what happens next.

Optimizing only the final response misses most of this path.

## The cost has several layers

An agent task can consume model context in at least six places:

1. **Tool definitions:** names, descriptions, input schemas, output schemas, and examples.
2. **Selection:** reasoning needed to distinguish similar tools and choose the correct one.
3. **Arguments:** structured parameters generated for the call.
4. **Results:** data returned to the model for the next decision.
5. **Round trips:** repeated model calls across a multi-step workflow.
6. **Recovery:** validation errors, retries, clarification, and alternate routes.

These costs interact. A shorter description can save input tokens and make the tool easier to misunderstand. A single broad tool can reduce round trips and increase the number of optional parameters, permissions, and failure modes the model must navigate.

Token efficiency is therefore an architecture problem, not a copy-editing exercise.

## Measure work completed, not responses produced

A smaller response is useful only if the agent still reaches the required outcome. A compact result that causes another lookup, a malformed call, or a retry can cost more than a longer result that resolves the decision once.

The denominator matters. For a repeated evaluation fixture, calculate:

`model tokens per verified outcome = total model input and output tokens / verified outcomes`

The outcome must be checked against application state, not inferred from a fluent final message. In a read workflow, success may mean returning the correct record. In a consequential workflow, success may mean completing an approved action. In a negative test, the successful outcome may be rejecting an unapproved action and recording the reason.

If no run reaches the verified outcome, the efficiency measure is undefined. A failing system cannot look efficient merely because it stops early.

[Anthropic's agent evaluation guidance](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents) recommends tracking task outcomes alongside turns, tool calls, token usage, latency, and errors. That combination is more useful than a token total alone because it reveals whether lower usage came from a better interface or from incomplete work.

## Do not optimize away the contract

Schemas, precise descriptions, and examples consume context because they carry useful information.

Removing them may lower the visible prompt size and increase malformed calls, wrong-tool selection, or unsafe parameter combinations. The system then pays through retries and lower task success.

The right question is not “How small can the tool definition become?” It is “What is the smallest contract that still produces reliable selection and valid execution for this task class?”

That answer needs evaluation. It cannot be inferred from token count alone.

## Expose fewer tools at a time

One of the strongest cost controls is selective exposure.

An application may own dozens of operations while a particular task needs only a small subset. A routing layer can first identify the domain, then expose the relevant tools to the model. This reduces context, narrows the decision space, and limits accidental access.

The router itself needs a contract. It should use stable task categories, record why a tool set was selected, and fail safely when the request spans several domains. Dynamic exposure should not become an invisible permission escalation mechanism.

## Choose granularity around decisions

Tool granularity should match a meaningful application decision.

Very granular tools make every backend step visible. They can also force the model through many sequential calls and require it to manage intermediate state. Very broad tools reduce round trips. They may hide important policy and approval boundaries inside one operation.

Runbook Relay deliberately separates read, compare, stage, execute, and reset. That is not the minimum number of calls. It is the smallest set that keeps investigation, proposal, approval, execution, and recovery visible as different decisions.

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

This is also why pagination needs an explicit continuation contract. The [Model Context Protocol specification](https://modelcontextprotocol.io/specification/2026-07-28/server/utilities/pagination) uses opaque cursors and a visible `nextCursor`, so a client can distinguish a complete result from the first slice of a larger set.

## Count latency and failures with tokens

A design that saves tokens and adds three round trips may feel slower and cost more operationally. A compact tool that frequently fails validation can create more model usage than a longer, clearer schema.

Measure the complete task:

| Metric | Why it matters |
|---|---|
| Definition tokens | Recurring context cost before execution |
| Calls per completed task | Orchestration and latency cost |
| Result tokens | Context added after each tool |
| Validation failures | Cost of an unclear or over-broad contract |
| Task success | Whether savings preserve the required outcome |
| Policy violations | Whether optimization weakened control |
| End-to-end latency | What the user experiences |

Publish the model, tokenizer, tool set, task fixture, run count, and failure examples with any result. Without that context, a token number is difficult to compare or reproduce.

## A deterministic budget in Runbook Relay

I added a structural efficiency gate to Runbook Relay's blocked-before-approval proof. It measures the serialized five-tool catalog plus the inputs and structured results for the four-call path that reads the incident, compares options, stages one mitigation, and verifies that execution is blocked without human approval.

Verified on 1 September 2026, the fixture records:

| Structural measure | Result | Budget |
|---|---:|---:|
| Tool-definition payload | 1,522 UTF-8 bytes | 2,400 bytes maximum |
| Four structured results | 969 UTF-8 bytes | 1,800 bytes maximum |
| Tool calls to the verified outcome | 4 | 4 maximum |
| Expected policy outcome | Blocked | Must be blocked |

The [measurement script](https://github.com/Andreasniss/runbook-relay-webmcp/blob/main/scripts/measure-agent-efficiency.mjs), [fixture](https://github.com/Andreasniss/runbook-relay-webmcp/blob/main/tests/fixtures/agent-efficiency.json), and [regression tests](https://github.com/Andreasniss/runbook-relay-webmcp/blob/main/tests/agent-efficiency.test.mjs) are public.

These are bytes, not tokens. The gate is deliberately tokenizer-independent and catches interface growth before a model is involved. It does not prove tool-selection accuracy or browser-agent efficiency. A model benchmark must add provider-reported token usage, repeated trials, latency, retries, and final-state grading.

## Use caching and routing where they preserve meaning

Stable tool definitions may benefit from provider-supported prompt caching. Repeated read-only results may benefit from application caching when freshness requirements allow it. Smaller models may handle classification or tool routing before a stronger model handles the complex decision.

Each optimization changes an assumption. Cache keys need to include the tool version and policy context. A routing model needs its own evaluation set. A stale result must remain visibly stale.

## Tokenmaxxing should maximize useful work

The goal is not the smallest prompt. It is the most reliable completed work for the available context, latency, and cost budget.

Expose only relevant tools. Keep their contracts precise. Design granularity around real decisions. Return structured evidence instead of raw payloads. Measure the entire path, including the failures.

The cheapest tool call is not always the shortest one. It is the one the system does not need to repeat.
