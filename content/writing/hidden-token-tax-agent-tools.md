---
title: "The Hidden Token Tax of Agent Tools"
date: 2026-08-31
description: "Tool cost begins before execution. Definitions, selection, results, round trips, and failure recovery all consume context and time."
primaryTopic: "Agent architecture"
evidenceLabel: "Architecture analysis"
lastVerified: 2026-08-31
keyPoints:
  - "Every exposed tool adds recurring context before the user request is solved."
  - "Reducing tokens must not remove the schemas and descriptions that keep tool use reliable."
  - "Measure the complete task path: definitions, calls, results, retries, latency, and correctness."
proofLinks:
  - label: "Inspect a bounded five-tool interface"
    url: "https://github.com/Andreasniss/runbook-relay-webmcp"
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

## Use caching and routing where they preserve meaning

Stable tool definitions may benefit from provider-supported prompt caching. Repeated read-only results may benefit from application caching when freshness requirements allow it. Smaller models may handle classification or tool routing before a stronger model handles the complex decision.

Each optimization changes an assumption. Cache keys need to include the tool version and policy context. A routing model needs its own evaluation set. A stale result must remain visibly stale.

## Tokenmaxxing should maximize useful work

The goal is not the smallest prompt. It is the most reliable completed work for the available context, latency, and cost budget.

Expose only relevant tools. Keep their contracts precise. Design granularity around real decisions. Return structured evidence instead of raw payloads. Measure the entire path, including the failures.

The cheapest tool call is not always the shortest one. It is the one the system does not need to repeat.
