---
title: "When Coding Agents Change Infrastructure: What Evidence Is Enough to Ship?"
date: 2026-09-05
description: "A hypothetical Kubernetes health-check change shows how to connect configuration review, delayed failure tests, rollout signals, and recovery evidence."
primaryTopic: "Reliability"
evidenceLabel: "Architecture analysis"
evidenceBoundary: "The Kubernetes behavior is documented in official sources. The service, proposed change, failure scenario, and review process are illustrative; no deployment experiment or productivity benchmark was performed."
lastVerified: 2026-09-05
keyPoints:
  - "Choose verification by the failure a change could cause and when it would become visible."
  - "Separate configuration acceptance, rollout completion, and application recovery."
  - "Require a bounded rollout and an explicit recovery owner before expanding exposure."
proofLinks:
  - label: "Kubernetes probe behavior"
    url: "https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/"
  - label: "Kubernetes Deployment status and rollback"
    url: "https://kubernetes.io/docs/concepts/workloads/controllers/deployment/"
  - label: "Andrew Ng on different rates of coding-agent acceleration"
    url: "https://www.linkedin.com/posts/andrewyng_coding-agents-are-accelerating-different-activity-7457457387671764992-peCP"
socialImage: "/images/social/evidence-for-agent-infrastructure-changes.png"
socialImageAlt: "When Coding Agents Change Infrastructure: What Evidence Is Enough to Ship?, an article by Andreas Nissen."
tags:
  - infrastructure
  - coding agents
  - verification
origin: "website"
featured: false
draft: true
---

A coding agent changes a service's liveness check from `/live` to `/ready`. Both endpoints return success during review. The configuration is valid and the deployment completes.

Later, the database slows down. In this hypothetical service, `/ready` checks database connectivity. Enough failed liveness checks now cause the application container to restart, although restarting it cannot repair the database. The configuration change has coupled a dependency problem to application restarts.

My release rule is simple: **before shipping an infrastructure change, identify the failure it could introduce, the observation that would reveal it, and the action that would restore service.** Match the evidence to those answers.

This is a worked architecture example, not an incident report or a completed experiment.

## A valid configuration can express the wrong intention

Kubernetes gives readiness and liveness probes different jobs. Readiness determines whether a Pod should receive Service traffic; repeated liveness failures can trigger a container restart. The official [probe documentation](https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/) describes those distinct behaviors.

For the example service, changing the endpoint changes what the platform treats as evidence that a restart is needed. A schema check can accept the path without understanding that decision.

The review should therefore start with the requirement: which failure is a restart supposed to repair? The service owner must answer that independently of the agent's implementation. “Both endpoints are health checks” is too vague.

Andrew Ng [describes infrastructure as less accelerated by coding agents than frontend work](https://www.linkedin.com/posts/andrewyng_coding-agents-are-accelerating-different-activity-7457457387671764992-peCP), emphasizing difficult tradeoffs and testing. I read that as a reason to examine feedback quality. His observation does not establish a universal productivity ratio, and an infrastructure change with strong, fast verification can still be a useful task to delegate.

## Ask for evidence at three boundaries

For this change, I would organize the review around three questions:

| Boundary | Evidence to request | What remains unresolved |
|---|---|---|
| Configuration | Exact diff, endpoint behavior, target workload, and validation result | Whether the new behavior is appropriate under failure |
| Runtime | Controlled dependency slowdown with probe, restart, and request observations | Whether the test represents production conditions |
| Recovery | Restoration of the reviewed configuration followed by application checks | Failures or side effects outside the exercise |

The useful distinction is what each check can prove. A passing validation result supports a claim about accepted configuration. It cannot support a claim about application availability during a database incident.

Bind these records to the proposed revision and the environment tested. Otherwise a convincing report can describe a different change from the one awaiting approval. My [pull-request evidence article](/writing/evidence-for-ai-generated-pull-requests/) develops that record-keeping contract.

## Make the delayed failure observable

The proposed runtime exercise would use a disposable environment, synthetic requests, and a controllable database dependency. First establish ordinary behavior. Then introduce dependency latency long enough to exercise the configured probe timeouts and failure thresholds.

Observe the dependency's responses, probe failures, container restarts, request errors, and recovery after latency is removed. The expected behavior must be written before the run. For this service, the acceptance condition could require a database slowdown to avoid unnecessary application restarts while request failures remain visible.

Also exercise a genuine application failure for which restart is the intended response. Removing an overly broad restart trigger should not silently remove the required recovery behavior.

A quiet five-minute run says little if the failure needs a condition that never occurred. Choose duration from the mechanism being tested. Record missing conditions, such as production traffic patterns or network differences, as remaining uncertainty.

## Decide who stops the rollout

After a successful exercise, introduce the change to a limited workload before expanding it. Define the exposed scope, the observation window, the stop condition, and the person or automation authorized to recover. A restart increase should be attributable to the changed version, rather than hidden inside a service-wide average.

Kubernetes rollout completion and ongoing application health are separate observations. Its Deployment progress deadline reports a stalled rollout; it does not itself perform an automatic rollback. The [Deployment documentation](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/) makes that responsibility explicit.

For this example, recovery would restore the previously reviewed probe configuration and verify both service behavior and restart behavior. A successful recovery command alone would be insufficient evidence that requests are healthy again.

The example changes a probe configuration. It does not cover data migrations, resource deletion, or changes with irreversible effects. Those need recovery evidence matched to their consequences, which may include restoring data or repairing forward.

The agent can prepare the diff and proposed checks. The release owner still needs to explain why those checks address this change's failure mechanism, and why the remaining uncertainty is acceptable for the proposed exposure.
