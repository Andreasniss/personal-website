---
title: "Why Browser Agent Governance Belongs on the Server"
date: 2026-09-01
description: "Moving agent policy from client state to a durable server control plane changes what a tool demo can prove."
primaryTopic: "Tool interfaces"
evidenceLabel: "Tested project analysis"
evidenceBoundary: "Runbook Relay demonstrates durable policy, scoped approval, idempotency, replay protection, and hash-linked receipts over a synthetic incident action. It does not provide enterprise identity, strong human-presence attestation, real infrastructure execution, or live-model performance results."
lastVerified: 2026-09-05
lastmod: 2026-09-05
keyPoints:
  - "A tool schema describes an operation. The server still has to decide whether that operation may run."
  - "Approval should bind identity, exact action, resource version, expiry, and one execution."
  - "Idempotency, concurrency guards, and verifiable receipts turn retries and races into explicit control decisions."
  - "A credible model evaluation needs versioned tasks, traces, human labels, latency, tokens, cost, and visible failures."
proofLinks:
  - label: "Open the canonical Runbook Relay demo"
    url: "https://runbook-relay.andreasnissen.dev"
  - label: "Inspect the Runbook Relay control plane"
    url: "https://github.com/Andreasniss/runbook-relay-webmcp/blob/main/db/control-plane.ts"
  - label: "Review the threat model"
    url: "https://github.com/Andreasniss/runbook-relay-webmcp/blob/main/docs/threat-model.md"
  - label: "Read the deterministic tests"
    url: "https://github.com/Andreasniss/runbook-relay-webmcp/tree/main/tests"
  - label: "Inspect the 50-task evaluation contract"
    url: "https://github.com/Andreasniss/runbook-relay-webmcp/tree/main/evals/live-tool-use"
socialImage: "/images/social/browser-tool-governed-workflow.png"
socialImageAlt: "Why Browser Agent Governance Belongs on the Server, an article by Andreas Nissen about durable agent controls."
tags:
  - agent architecture
  - WebMCP
  - human approval
  - idempotency
  - evaluation
origin: "website"
featured: true
draft: false
image: "/images/projects/runbook-relay-architecture.svg"
imageAlt: "Browser agent, simulator, and human page controls converging on one server policy boundary with durable D1 records and a synthetic executor."
relatedProjectURL: "/projects/runbook-relay/"
relatedProjectTitle: "Runbook Relay WebMCP Demo"
repoURL: "https://github.com/Andreasniss/runbook-relay-webmcp"
series: "Reliable Agent Systems"
seriesOrder: 7
---

Moving policy from the browser to the server changed the claim Runbook Relay could support.

The first version demonstrated a useful interaction pattern. A browser agent could inspect an incident, compare predefined mitigations, stage one, and attempt execution. The page kept approval visible and blocked the negative path.

That proved the shape of the workflow. It did not prove a durable control boundary. The same client state rendered the interface and decided whether execution was allowed. Reloading the page erased the evidence. A stale or competing request had no durable resource version to check. An exact retry could not return a stored result.

A governed workflow needs stronger answers.

## The page should not be the policy authority

WebMCP makes an operation explicit. It gives the page a named tool, a description, a bounded input schema, and a structured result. Those properties make discovery and testing easier.

They do not grant authorization.

A tool description that says “human approval required” is guidance for the model. A destructive annotation is useful metadata for the client. The service performing the action still has to reject an unapproved request.

Runbook Relay now routes native WebMCP calls, its labeled simulator, and human page controls through one same-origin server API. React renders the returned snapshot. It no longer owns the policy decision.

That separation creates a useful invariant:

> Every interface can request a transition. Only the control plane can commit it.

## Approval should name the exact action

A Boolean such as `approved: true` leaves too much unresolved.

Which action did the person approve? Which parameters? Which version of the incident? How long should that decision remain valid? Can another session reuse it? Did an earlier execution already consume it?

The server now binds approval to:

- a server-issued session identity;
- the incident and catalog mitigation;
- a SHA-256 action digest;
- the current resource version;
- a five-minute expiry; and
- a consumption timestamp.

Staging a mitigation increments the resource version. The server calculates the action digest from the incident ID, mitigation ID, and new version. It also derives an idempotency key from the session and digest.

The page sends the digest and version back when the operator approves. A new execution has to present the same digest, version, and idempotency key. The server checks that the approval belongs to the same session, remains active, and has not been consumed.

A new effect is blocked when those checks fail. An exact retry of a completed execution follows a different path: it returns the stored result.

## Retries need a policy result

Retries are normal in distributed systems. They become dangerous when the operation is consequential and the caller cannot tell whether the first request completed.

“Please do not call this twice” is an optimistic approach to distributed systems. The service needs to make the retry safe.

Runbook Relay assigns one execution record to each session-specific idempotency key. The first allowed request stores the result. Repeating the exact action returns that record without applying the synthetic effect again. Reusing the key with another action digest is a policy conflict.

The distinction matters:

| Request | Control decision |
|---|---|
| First matching request with active approval | Execute once and store the result |
| Exact retry | Return the stored result |
| Same key, different action | Block as an idempotency conflict |
| New execution with an old digest or resource version | Block as stale state |
| New execution with expired or consumed approval | Block at the approval boundary |

For example, if the first execution succeeds but its response is lost, a retry must retrieve that execution. It must not ask the model to invent a new key or apply the same mitigation again. The model does not decide which case applies. Durable records do.

## Concurrency should not create fictional evidence

An audit trail can still mislead if a stale request appends a receipt after losing the state race.

Each Runbook Relay mutation uses compare-and-swap conditions over the resource version and current receipt-chain head. The receipt insert is also conditional on the new head. A request that does not win the state transition cannot leave behind a receipt claiming that it did.

Approval insertion uses the same pattern. Execution also requires the staged digest, version, idempotency key, unconsumed approval, expiry, session identity, and prior receipt head to match.

The evidence record and the state transition need the same concurrency boundary. The demo applies this rule to state in D1 and a synthetic executor.

That does not establish exactly-once execution against a real infrastructure API. A production change could succeed downstream just before the caller crashes without recording the result. Depending on the service, closing that gap may require a durable dispatch record, downstream idempotency, and reconciliation of uncertain outcomes. A local database transaction alone cannot guarantee the remote effect.

## Receipts should be verifiable, not only visible

Visible receipts help a reviewer compare what the model says with what the application recorded. Durability makes that evidence survive a reload. Hash linkage adds an integrity check.

Each receipt hash covers canonical JSON with the session and caller identity, event and tool, input and result, outcome and detail, action digest and resource version, previous hash, and timestamp.

The snapshot API returns the latest 100 receipts plus one anchor when the chain is longer. It recomputes content hashes and verifies the links in that returned segment. The response reports the total receipt count, returned count, truncation state, head, and verification result.

Verification detects changes that no longer match the stored hashes or links in the returned segment. Someone able to rewrite both the records and their hashes could construct a different internally consistent chain. The extra anchor comes from the same store; it is not an independent witness. Production evidence would need trusted identity, retention controls, independent anchoring, redaction, and access monitoring.

## “Human approval” still needs an honest boundary

The demo now issues a random 256-bit session cookie and stores only a SHA-256-derived key. The cookie is `HttpOnly`, `SameSite=Strict`, and `Secure` on HTTPS. State-changing requests require the exact same origin and JSON content type. Worker responses deny framing.

These controls isolate browser sessions and make cross-site misuse harder. They do not authenticate an employee or prove that a human initiated the page click.

The term “human approval” describes the intended interaction and the absence of an agent-callable approval tool. A browser agent with general page-control capability could still press the approval button. A production workflow should use organization identity, explicit authorization policy, and strong confirmation for consequential actions.

## The evaluation also needs a control boundary

A deterministic test can prove that code rejects an expired approval. It cannot prove that a model selects the right tool across realistic requests.

Runbook Relay now includes 50 versioned tasks across observation, comparison, staging, unauthorized execution, approved execution, reset, and out-of-scope requests. Eighteen tasks are adversarial. The live runner requires a pinned model and current pricing inputs. It captures tool traces and results, task and policy grades, provider request IDs, latency, tokens, estimated cost, and a human-label template for response quality and failure taxonomy.

As of 5 September 2026, the repository publishes the evaluation contract without a completed live-model result. The runner uses an in-process tool fixture, so even a successful future run would need to be distinguished from an evaluation of native browser discovery and the deployed server.

Report successful task completion and successful safety denials separately. Human review must check that the final response agrees with the tool trace and application state. [Evidence for AI-generated pull requests](/writing/evidence-for-ai-generated-pull-requests/) applies the same discipline to release claims.

## What the project proves now

Within its synthetic executor, Runbook Relay supports this claim: a browser-agent workflow can keep one visible human interface while a durable server control plane enforces scoped approval, stale-state checks, idempotency, replay protection, concurrency guards, and hash-linked receipts.

The remaining gaps are explicit. Enterprise identity, strong human confirmation, real infrastructure authorization, independent audit anchoring, operational recovery, and live-model evidence still require separate work.

The next production decision is therefore specific: can the target service bind an approved action to a durable execution record and reconcile an uncertain result? Until that is solved, the demo's replay guarantees should stay scoped to its synthetic executor.
