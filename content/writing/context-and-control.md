---
title: "Context and Control Are Different Layers"
date: 2026-08-30
description: "An agent needs enough context to reason and enough control to act safely. Treating them as one system hides different failure modes."
tags:
  - agent architecture
  - context
  - governance
origin: "website"
featured: true
draft: false
image: "/images/articles/enterprise-ai-two-graphs.svg"
imageAlt: "Enterprise AI needs two graphs: a context graph for understanding and a workflow graph for controlled execution."
relatedProjectURL: "/projects/7dayfocus-ai-delivery-lab/"
relatedProjectTitle: "7DayFocus AI Delivery Lab"
---

Enterprise AI agents need context and control.

Context without control is unsafe. Control without context is blind.

They belong in the same architecture, and they should not collapse into the same layer. A missing relationship degrades an answer. A missing authorization check can trigger an action the user never permitted. Those failures have different consequences, owners, and tests.

## Context answers what the agent should know

Context is the evidence available for reasoning. It can include documents, structured records, tool results, conversation state, identity attributes, and the relationships between them.

The architecture question is not simply how much context to provide. It is how to provide the smallest relevant set with visible provenance.

Good context design helps an agent answer questions such as:

- Which customer, account, project, or incident does this request concern?
- Which policies and technical constraints apply?
- Which facts came from an authoritative system?
- What changed since the last decision?
- Which entities and events are related?

A knowledge graph or ontology can make these relationships explicit. Retrieval can add relevant evidence at runtime. Tool calls can fetch current state. Each mechanism improves the agent's picture of the world.

None of them grants permission to change that world.

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

This sequence is slower than letting the model call a broad administrative API. That friction is the product when the action is consequential.

## Keep the distinction visible

Teams often draw one large “agent platform” box around retrieval, memory, tools, policy, and orchestration. The diagram looks simple and the operating model becomes unclear.

Keep context and control visible as separate architectural concerns. Give each an owner, interface, evidence set, and failure budget. Connect them through explicit identity and action contracts.

The agent becomes more useful when it understands the situation. It becomes trustworthy when the system still controls what happens next.
