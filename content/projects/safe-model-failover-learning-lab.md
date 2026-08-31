---
title: "Safe Model Failover Learning Lab"
description: "An interactive reliability lab for bounded retries, policy-safe fallback, circuit breaking, and fail-closed model routing."
role: "Creator and release owner"
year: 2026
weight: 15
featured: true
statusLabel: "Live learning lab"
tags:
  - model routing
  - reliability
  - safety controls
demoURL: "https://model-failover-learning-lab.andreas-nissen.chatgpt.site"
image: "/images/projects/model-failover-learning-lab.jpg"
imageAlt: "Safe Model Failover Learning Lab showing a 429 and 503 incident scenario with retry, fallback, and stop decisions."
relatedArticleURL: "/writing/context-and-control/"
relatedArticleTitle: "Context and Control Are Different Layers"
---

## The problem

Model outages are not one failure mode. A 429 can signal quota or rate-limit pressure, while a 503 can signal temporary service or regional capacity. Immediate retries can amplify an outage, and an improvised fallback can silently change safety behavior, output shape, data residency, or tool access.

For tool-using agents, retrying is more consequential still. A tool may already have changed state before the model call failed. Replaying that work without an idempotency key or execution ledger can duplicate an email, transaction, or other side effect.

## What I built

The Safe Model Failover Learning Lab is a browser-local, retrieval-first exercise for choosing exactly one terminal action: retry, use an approved fallback, or stop. Learners classify realistic failures, spend bounded attempt and elapsed-time budgets, step through a closed, open, and half-open circuit breaker, and resolve a mixed 503 and 429 incident.

The deterministic policy honors provider delay signals such as `Retry-After`. A fallback is allowed only when its model, Region, and tools are allow-listed and its safety controls, output schema, capability, and data boundary remain compatible. State-changing tool work blocks retry and fallback unless idempotency protection is explicit.

## What it demonstrates

- A retry must fit the provider delay, attempt limit, and end-to-end latency budget.
- Cross-Region inference distributes capacity; it is not a substitute for an application recovery plan.
- A circuit breaker protects dependencies and reopens through a controlled half-open probe.
- Availability never expands the approved safety, schema, residency, or tool boundary.
- Every routing decision should record its classification, budgets, circuit state, approvals, action, and reason.

## Verification and research basis

The current version passes 50 deterministic policy and evidence-store tests plus its production build. The lab contains no credentials, analytics, backend calls, remote fonts, or model-provider calls. Learning evidence stays in browser storage and can be exported or reset.

The August 2026 quality upgrade was grounded in a 30-source Exa review across three workstreams. The final content prioritizes current primary guidance from Amazon Bedrock, Google Cloud Vertex AI, and Microsoft Foundry, with the linked sources available inside the lab.

This is an independent learning and portfolio project, not a production router, availability benchmark, or service endorsed by AWS, OpenAI, Microsoft, Google, or any model provider.
