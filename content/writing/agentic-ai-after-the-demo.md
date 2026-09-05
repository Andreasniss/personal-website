---
title: "The Hard Part of Agentic AI Starts After the Demo"
date: 2026-06-15
description: "A working prototype proves possibility. Production requires a separate discipline for autonomy, reliability, security, cost, and operations."
primaryTopic: "Reliability"
evidenceLabel: "Architecture analysis"
evidenceBoundary: "The argument applies the AWS Well-Architected Agentic AI Lens and links to a companion reference lab. It does not present the lab as production evidence or disclose confidential customer results."
lastVerified: 2026-09-05
keyPoints:
  - "A successful demo proves a capability path, not production readiness."
  - "Reliability, security, cost, and operations need explicit controls and tests."
  - "The production boundary should stay visible in architecture and evidence."
proofLinks:
  - label: "Inspect the Agent Reliability Lab"
    url: "https://github.com/Andreasniss/Mistral-playground"
socialImage: "/images/social/agentic-ai-after-demo.png"
socialImageAlt: "The Hard Part of Agentic AI Starts After the Demo, an article by Andreas Nissen."
tags:
  - agentic AI
  - AWS Well-Architected
  - production architecture
origin: "linkedin"
linkedinURL: "https://www.linkedin.com/feed/update/urn:li:activity:7472293085532786688/"
featured: false
draft: false
image: "/images/articles/agentic-ai-after-demo.jpg"
imageAlt: "Original LinkedIn infographic about the engineering work required after an agentic AI demo succeeds."
relatedProjectURL: "/projects/mistral-playground/"
relatedProjectTitle: "Agent Reliability Lab"
series: "Reliable Agent Systems"
seriesOrder: 1
lastmod: 2026-09-05
---

An agent finds the right incident, chooses a plausible fix, and calls the tool successfully. Then the tool times out on the next run. The team cannot tell whether the change happened, and the agent tries again.

The demo worked. The retry is where the plot thickens: which component owns the uncertain outcome?

Agents combine familiar distributed-system failures with model-dependent decisions. A run can contain repeated model calls, tools, memory, and handoffs. Production readiness depends on understanding that complete path, including what happens when only part of it succeeds.

The [AWS Well-Architected Agentic AI Lens](https://docs.aws.amazon.com/wellarchitected/latest/agentic-ai-lens/agentic-ai-lens.html) gives teams a framework for closing that gap. It adapts all six Well-Architected pillars to the way agentic systems actually behave: operational excellence, security, reliability, performance efficiency, cost optimization, and sustainability.

## A demo proves possibility, not readiness

A successful demo usually answers a narrow question: can the model, prompt, tools, and data produce a useful result in a controlled scenario?

Production requires evidence for the whole run: who may act, how failures are detected and recovered, and what a useful outcome costs. It also needs a way to review and reverse changes to the artifacts that shape agent behavior. A better prompt cannot supply those operating controls.

## Responsible AI belongs in every pillar

The Agentic AI Lens places responsible AI across its architectural practices. That is useful because oversight, transparency, and bounded autonomy depend on implementation choices in several parts of the system.

Bounded autonomy is a security and reliability concern. Transparency depends on operational tracing. Human oversight must match the consequence and reversibility of an action. Goal alignment requires evaluation that measures whether the system achieves the intended outcome, not only whether a response sounds plausible.

## Two practical ways to use the lens

Use it early as a design guide, while architecture decisions are inexpensive to change.

For an existing workload, use it as a review framework. AWS documents how to download the Agentic AI custom lens from its public repository and import it into the Well-Architected Tool. Record each finding against a component, an owner, and a verification step. Completing a questionnaire is the start of the improvement work, not evidence that the risk is resolved.

A review should still be grounded in the workload. Not every practice has the same priority for every agent. A read-only research assistant and an agent that changes customer data need different controls. The value of the framework is that it makes those decisions explicit.

## Start with the failure modes

For teams moving from prototype to production, I would begin with four boundaries:

1. **Action boundary.** Define every operation the agent can perform, the identity it uses, the resources it can reach, and the approval required.
2. **Behavior boundary.** Build evaluations for the scenarios, refusals, handoffs, and failure cases that matter to the business outcome.
3. **Operational boundary.** Trace the complete run and define how the system detects, contains, and recovers from partial failure.
4. **Economic boundary.** Measure model calls, tool calls, retries, and coordination overhead against a useful completed outcome.

## Turn the review into an executable check

For the timed-out incident change, I would ask for this evidence before expanding autonomy:

| Question | Evidence needed |
|---|---|
| Was this exact change authorized? | Approval bound to the action and relevant resource state |
| Did it execute before the timeout? | An execution identifier and a way to retrieve or reconcile its outcome |
| Can a retry duplicate it? | A repeat-request test against the service's idempotency contract |
| Who handles an unknown outcome? | A defined escalation path that suspends further effects |
| Does the route remain useful? | Legitimate completion, safe denials, latency, and total cost reported separately |

These are proposed review criteria, not results from a production deployment. Start with one consequential operation and verify both the allowed path and the failure response before broadening the agent's authority.

The [Agent Reliability Lab](/projects/mistral-playground/) makes a smaller set of boundaries inspectable: allow-listed tools, bounded loops, credential-free evaluation, and metadata-only telemetry. Its deterministic checks do not establish live-model quality or production readiness.

For the uncertain-effect problem, [Model Failover Is a Policy Decision](/writing/model-failover-is-policy/) explains why switching providers cannot resolve whether an earlier tool action happened. The useful outcome of a readiness review is an owned repair with observable evidence.
