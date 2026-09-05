---
title: "Why Enterprise AI Agents Need Separate Context and Control Layers"
date: 2026-08-30
description: "An agent needs enough context to reason and enough control to act safely. Treating them as one system hides different failure modes."
primaryTopic: "Agent architecture"
evidenceLabel: "Architecture analysis"
evidenceBoundary: "This is an architecture argument, not a comparative benchmark. The 7DayFocus project shows one inspected implementation of the proposal, validation, and approval boundary."
lastVerified: 2026-09-05
lastmod: 2026-09-05
keyPoints:
  - "Context determines what the agent can understand."
  - "Control determines which actions the system will permit."
  - "Each layer needs its own owner, tests, and failure budget."
proofLinks:
  - label: "Review the 7DayFocus case study"
    url: "/projects/7dayfocus-ai-delivery-lab/"
socialImage: "/images/social/context-and-control.png"
socialImageAlt: "Why Enterprise AI Agents Need Separate Context and Control Layers, an article by Andreas Nissen."
tags:
  - agent architecture
  - context
  - governance
origin: "website"
featured: false
draft: false
image: "/images/articles/enterprise-ai-two-graphs.svg"
imageAlt: "Enterprise AI needs two graphs: a context graph for understanding and a workflow graph for controlled execution."
relatedProjectURL: "/projects/7dayfocus-ai-delivery-lab/"
relatedProjectTitle: "7DayFocus AI Delivery Lab"
series: "Reliable Agent Systems"
seriesOrder: 2
---

An agent finds a runbook that names a service owner and recommends rolling back a deployment. The recommendation fits the incident. The named owner changed teams last week.

Should the rollback run? Better retrieval might correct the stale ownership record. The action service must still check the current caller's permission and the exact change being requested.

A runbook is not a permission slip. Better evidence cannot authorize the rollback, and valid authorization cannot make the fix correct. These failures need different repairs.

The separation is logical. A small application can implement both responsibilities in one service, provided model-visible context cannot rewrite the policy that governs execution.

## Context answers what the agent should know

Context is the evidence available for reasoning. It can include documents, structured records, tool results, conversation state, identity attributes, and the relationships between them.

The architecture question is not simply how much context to provide. It is how to provide the smallest relevant set with visible provenance.

Good context design helps an agent answer questions such as:

- Which customer, account, project, or incident does this request concern?
- Which policies and technical constraints apply?
- Which facts came from an authoritative system?
- What changed since the last decision?
- Which entities and events are related?

A knowledge graph or ontology can make these relationships explicit. Retrieval can add relevant evidence at runtime. Tool calls can fetch current state. Each mechanism can improve the agent's picture of the world when its sources and freshness are appropriate.

None of them grants permission to change that world. An identity attribute in a retrieved document or prompt is evidence to examine. The authorization decision must use trusted identity and policy data, checked at execution time.

## Control answers what the agent may do

Control constrains execution. It decides which identity is acting, which operation is allowed, which resources are in scope, what approval is required, and what evidence must be recorded.

Useful controls include:

- authenticated user and workload identities;
- authorization evaluated at the action boundary;
- narrowly scoped tools with explicit input contracts;
- policy checks based on the requested operation and resource;
- human approval for consequential changes;
- idempotency and state validation before execution;
- an audit record that connects request, decision, action, and result.

A model instruction such as “ask before deleting” is helpful behavior guidance. It is not an authorization control. The tool or service performing the deletion still needs to reject an unapproved request.

## The layers fail differently

The separation matters because each layer needs a different test strategy.

| Layer | Typical failure | Primary test |
|---|---|---|
| Context | Missing, stale, irrelevant, or conflicting evidence | Retrieval quality, provenance, freshness, answer grounding |
| Reasoning | Unsupported conclusion or poor plan | Scenario evaluation, rubric scoring, adversarial cases |
| Control | Unauthorized, over-broad, or unapproved action | Policy tests, negative authorization tests, approval bypass attempts |
| Execution | Duplicate, partial, or stale-state change | Idempotency, preconditions, rollback, result verification |

An evaluation set that measures answer quality will not prove that execution is authorized. A policy engine that blocks forbidden operations will not make a plan well informed.

## A practical architecture sequence

When an agent may take action, design the flow in explicit stages:

1. **Resolve identity and intent.** Know who is asking and what outcome they want.
2. **Assemble relevant context.** Retrieve the evidence required for this decision and expose its sources.
3. **Propose a bounded action.** Turn reasoning into a structured operation with explicit parameters.
4. **Evaluate policy.** Check identity, resource, operation, environment, and risk.
5. **Request approval when needed.** Show the exact action and consequence, not a vague confirmation.
6. **Execute with preconditions.** Revalidate state, enforce idempotency, and fail closed when assumptions changed.
7. **Verify and record the result.** Report what happened and preserve an audit trail.

Scale these checks to the action. A low-risk read may need an automatic authorization check and a source timestamp. A production rollback may need a staged diff, current resource version, and explicit approval. Measure the overhead; the architecture alone does not establish a latency penalty.

## Keep the distinction visible

Teams often draw one large “agent platform” box around retrieval, memory, tools, policy, and orchestration. The diagram looks simple and the operating model becomes unclear.

Give context and control separate owners, interfaces, and evidence. Connect them through explicit identity and action contracts.

For the rollback example, test two failures separately: a stale runbook should produce an uncertain or corrected recommendation; a revoked role should block execution even when the recommendation is sound. Then test them together. A good answer and a valid credential are still insufficient if the requested action exceeds that credential's scope.

The [7DayFocus case study](/projects/7dayfocus-ai-delivery-lab/) shows a smaller version of this boundary: a model proposes a change, and the application validates the proposal and checks state before applying an approved transition.
