---
title: "When AI Agents Need Governed Tools, Not Just Screenshots"
date: 2026-08-29
description: "Agent-friendly interfaces should expose structured operations without taking the human operator out of the loop."
primaryTopic: "Tool interfaces"
evidenceLabel: "Tested project analysis"
evidenceBoundary: "Runbook Relay tests bounded tool contracts, durable server policy, scoped approval, replay protection, and receipts over a synthetic incident. It does not benchmark screen use against WebMCP or demonstrate enterprise identity and production authorization."
lastVerified: 2026-09-05
lastmod: 2026-09-05
keyPoints:
  - "A shared interface should distinguish proposed, approved, applied, and recovered states."
  - "The human interface should remain the shared place for approval and evidence."
  - "Negative-path tests matter more than a smooth happy-path demonstration."
proofLinks:
  - label: "Inspect Runbook Relay"
    url: "https://github.com/Andreasniss/runbook-relay-webmcp"
  - label: "Review its contract tests"
    url: "https://github.com/Andreasniss/runbook-relay-webmcp/blob/main/tests/app-contract.test.mjs"
socialImage: "/images/social/governed-tools.png"
socialImageAlt: "When AI Agents Need Governed Tools, Not Just Screenshots, an article by Andreas Nissen."
tags:
  - WebMCP
  - tool design
  - human approval
origin: "website"
featured: false
draft: false
relatedProjectURL: "/projects/runbook-relay/"
relatedProjectTitle: "Runbook Relay WebMCP Demo"
series: "Reliable Agent Systems"
seriesOrder: 3
---

An agent says, “I have prepared the mitigation.” The operator sees a green status badge. Does that mean the change was proposed, approved, applied, or verified to have fixed the incident?

Green is doing a lot of work here. The interface should name the state without making the operator reconstruct the conversation.

Screen-based agents can use rendered pixels, and some browser clients also inspect the DOM or accessibility information. Structured page tools add another route. Whichever route initiates the work, the application should expose the same proposal, approval state, and recorded outcome to the person responsible.

## The interface should remain shared

The answer is not to move the agent into a private backend channel that the operator cannot see. That creates a second control surface and divides the evidence.

A stronger pattern keeps the website as the shared workspace and exposes narrow structured tools from it. The human and agent see the same incident, selected option, approval state, and result. Tool calls and page controls request transitions through the same server policy boundary. Every meaningful transition remains visible.

This creates three useful properties:

1. **Clarity:** the agent knows the supported operations and their input schemas.
2. **Consistency:** human and agent actions use the same application logic.
3. **Inspectability:** the operator can see what the agent read, proposed, and changed.

## Tool boundaries matter more than tool count

An agent-friendly page does not need a tool for every UI control. It needs a small set that maps to user outcomes.

For an incident workflow, a useful tool set could be:

- read the incident snapshot;
- compare predefined mitigations;
- stage one mitigation;
- execute an approved mitigation;
- reset a deterministic simulation.

The verbs reveal the control model. Reading, staging, approving, and executing are different transitions. If one tool accepts arbitrary commands and performs all four, the interface may be machine-readable while the control boundary remains weak.

## Show the decision the operator is being asked to make

In an incident workflow, an approval view should name the affected service, current state, proposed change, expected consequence, and what remains uncertain. “Approve mitigation” carries too little information if the selected mitigation can change after the page renders.

Runbook Relay uses predefined synthetic options. Its interface separates a staged mitigation from execution and distinguishes an applied action from an incident that has recovered. That distinction prevents a successful tool call from becoming a claim that service health is restored.

For a production version, I would make four states explicit:

| State | What the operator should be able to establish |
|---|---|
| Proposed | Exact resource and change, with the evidence behind it |
| Approved | Who authorized that change, against which state, and until when |
| Applied | What the service recorded as executed |
| Verified | Whether observed results meet the stated recovery criteria |

Keep predicted improvement visibly separate from observed results. If the underlying resource or proposal changes, invalidate the pending approval and show the new decision.

## Human approval must be a system state

“Ask the user first” is not enough. A model can misunderstand the answer, use approval from the wrong context, or treat silence as consent.

Approval should be an explicit state owned by the service. It should bind the approver identity, exact action, parameters, resource version, and expiry. The execution path should check that state again immediately before the change.

The critical negative test is straightforward:

> Stage a change and then attempt to execute it without approval.

The system should reject the action and record the rejection. If the model merely promises not to call the tool, the architecture has not been tested.

## Receipts create a shared evidence trail

Record consequential proposals, approvals, execution attempts, and outcomes so the human can inspect them. Capture enough evidence to explain the decision without turning the receipt store into a second copy of sensitive source data. Useful fields include:

- tool name and caller;
- selected or redacted input fields;
- policy outcome and reason;
- result status and a reference to the affected record;
- timestamp and relevant state version.

Runbook Relay stores its synthetic event receipts in D1 and hash-links their canonical contents. Rejected attempts must remain distinguishable from receipts that assert a committed change. This does not replace a signed or independently anchored production audit system. It makes the interaction understandable and exposes mismatches between what the model claims and what the service recorded.

## Design the fallback honestly

Emerging browser capabilities are not available everywhere. A demo can include a simulator that calls the same server API. The simulator must be labeled clearly. It proves the state transitions and control logic, not native browser tool discovery.

That distinction matters. A convincing simulation is useful evidence when it states exactly what it proves.

## A page click does not prove human presence

Keeping approval visible is a useful interaction design choice. It does not establish who clicked. A browser agent with general page controls may be able to press the same button even when no approval tool is exposed.

Runbook Relay binds approval to an anonymous browser session. A real operational workflow also needs authenticated identity, action-specific authorization, and confirmation appropriate to the consequence. The page should make those guarantees understandable, and the service must enforce them.

## Keep the next decision visible

Before adding capabilities, ask a reviewer to identify what is proposed, what happened, and what decision is needed next. If they need the chat transcript, the page has more work to do.

[Screen Use vs WebMCP](/writing/screen-use-vs-webmcp/) covers when to choose each interaction route. [Why Browser Agent Governance Belongs on the Server](/writing/from-browser-tool-to-governed-workflow/) explains how Runbook Relay enforces the transitions.
