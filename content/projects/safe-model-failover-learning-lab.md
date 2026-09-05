---
title: "Safe Model Failover Learning Lab"
description: "Practice deciding whether a failed model request may be retried, sent to an approved backup, or stopped. The browser-local lab uses deterministic scenarios and no live model calls."
role: "Creator and release owner"
year: 2026
weight: 40
featured: false
statusLabel: "Live learning lab"
tags:
  - model routing
  - reliability
  - safety controls
demoURL: "https://model-failover-learning-lab.andreas-nissen.chatgpt.site"
demoLabel: "ChatGPT Sites demo"
image: "/images/projects/model-failover-learning-lab.jpg"
imageAlt: "Safe Model Failover Learning Lab introducing what an application should do when an AI model fails."
socialImage: "/images/social/safe-model-failover.png"
socialImageAlt: "Safe Model Failover Learning Lab, an interactive reliability lab by Andreas Nissen."
relatedArticleURL: "/writing/model-failover-is-policy/"
relatedArticleTitle: "Model Failover Is a Policy Decision"
---

## The problem

Model outages are not one failure mode. A 429 can signal quota or rate-limit pressure, while a 503 can signal temporary service or regional capacity. Immediate retries can amplify an outage, and an improvised fallback can silently change safety behavior, output shape, data residency, or tool access.

For tool-using agents, retrying is more consequential still. A tool may already have changed state before the model call failed. Replaying that work without an idempotency key or execution ledger can duplicate an email, transaction, or other side effect.

## My role and key decision

I own the learning goals, scenario requirements, policy rules, verification criteria, risk, and release decisions, and review the work. AI tools assisted with implementation. I chose deterministic scenarios so learners can inspect why a route is permitted without supplying credentials or causing an external effect.

## What I built

The Safe Model Failover Learning Lab is a browser-local tutorial for choosing exactly one action: wait and retry, use an approved backup, or stop safely. It teaches the decision in plain language before asking learners to practice it. A simple request, failure, and decision walkthrough leads into a glossary, a guided incident, short exercises, and an optional knowledge check.

Exercises save answers and scores locally without asking learners to estimate confidence.

The tutorial compares provider-managed capacity and model-routing features across AWS, Google Cloud, Microsoft Azure, OCI, and IBM Cloud. It makes the ownership boundary explicit: managed routing may reduce failures, but the application still owns its retry budget, backup approvals, tool state, and recovery of dependent services.

The deterministic policy honors provider delay signals such as `Retry-After`. A fallback is allowed only when its model, Region, and tools are allow-listed and its safety controls, output schema, capability, and data boundary remain compatible. State-changing tool work blocks retry and fallback unless idempotency protection is explicit.

## Try the decision path

Open the lab, follow the request-and-failure walkthrough, then complete the guided incident. Before choosing an action, identify the failure type, remaining retry budget, approved backup, and whether a tool may already have changed state. Compare your choice with the policy reason the lab returns.

Use the exercises to test the boundary: a temporary outage may justify another attempt, while an incompatible data boundary should prevent a model switch. Export your learning record if you want to keep it, or use the reset control to clear local progress. These are simulated decisions; the lab does not dispatch a real request.

## Deployment choice

The interactive tutorial is hosted on ChatGPT Sites to provide a zero-setup learning path. The material remains provider-neutral: it compares provider-managed routing while keeping retry budgets, approved backups, tool state, and recovery decisions at the application boundary. This website is the canonical project record, and the hosting choice does not imply OpenAI review or endorsement.

## What it demonstrates

- A retry must fit the provider delay, attempt limit, and end-to-end latency budget.
- Provider capacity routing can improve availability; it is not a substitute for an application recovery plan.
- A circuit breaker protects dependencies and reopens through a controlled half-open probe.
- Availability never expands the approved safety, schema, residency, or tool boundary.
- Every routing decision should record its classification, budgets, circuit state, approvals, action, and reason.

## Verification and research basis

The August 2026 project verification recorded 50 deterministic policy and evidence-store tests and a production build. This page links a hosted tutorial, not a public source repository, so those tests are not independently reproducible from the materials published here. The visible scenarios demonstrate the teaching model; they do not benchmark provider availability.

Learning evidence stays in browser storage and can be exported or reset. The lab makes no model-provider calls. Provider comparisons link to first-party documentation inside the tutorial; check the relevant service's current supported models, regions, and data policies before applying a pattern to a real system.

This is a demo learning lab for understanding production model failover patterns. It is not a production router, availability benchmark, or service endorsed by AWS, OpenAI, Microsoft, Google, Oracle, IBM, or any model provider.
