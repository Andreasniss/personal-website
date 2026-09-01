---
title: "From Screenshots to Governed Tools"
date: 2026-08-29
description: "Agent-friendly interfaces should expose structured operations without taking the human operator out of the loop."
primaryTopic: "Tool interfaces"
evidenceLabel: "Tested project analysis"
evidenceBoundary: "Runbook Relay tests bounded tool contracts, durable server policy, scoped approval, replay protection, and receipts over a synthetic incident. It does not benchmark screen use against WebMCP or demonstrate enterprise identity and production authorization."
lastVerified: 2026-09-01
keyPoints:
  - "Screens expose pixels; governed tools expose typed operations and policy intent."
  - "The human interface should remain the shared place for approval and evidence."
  - "Negative-path tests matter more than a smooth happy-path demonstration."
proofLinks:
  - label: "Inspect Runbook Relay"
    url: "https://github.com/Andreasniss/runbook-relay-webmcp"
  - label: "Review its contract tests"
    url: "https://github.com/Andreasniss/runbook-relay-webmcp/blob/main/tests/app-contract.test.mjs"
socialImage: "/images/social/governed-tools.png"
socialImageAlt: "From Screenshots to Governed Tools, an article by Andreas Nissen."
tags:
  - WebMCP
  - tool design
  - human approval
origin: "website"
featured: false
draft: false
image: "/images/projects/runbook-relay-webmcp.png"
imageAlt: "Runbook Relay WebMCP incident-response interface with scoped tools, desktop setup guidance, and a human-approval boundary."
relatedProjectURL: "/projects/runbook-relay/"
relatedProjectTitle: "Runbook Relay WebMCP Demo"
series: "Reliable Agent Systems"
seriesOrder: 3
---

An agent can use a website by looking at pixels, clicking controls, and reading the result. That is powerful because it works without changing the application.

It is also the least explicit way to automate a consequential interface.

The agent has to infer what a chart means, which control maps to which action, whether the page changed, and whether an approval actually exists. The human sees a visual interface. The agent reconstructs a hidden API from appearance and behavior.

For high-consequence workflows, the page should expose a better contract.

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

## Human approval must be a system state

“Ask the user first” is not enough. A model can misunderstand the answer, use approval from the wrong context, or treat silence as consent.

Approval should be an explicit state owned by the service. It should bind the approver identity, exact action, parameters, resource version, and expiry. The execution path should check that state again immediately before the change.

The critical negative test is straightforward:

> Stage a change and then attempt to execute it without approval.

The system should reject the action and record the rejection. If the model merely promises not to call the tool, the architecture has not been tested.

## Receipts create a shared evidence trail

Every tool call should produce a durable receipt the human can inspect. At minimum, record:

- tool name and caller;
- structured input;
- policy outcome;
- structured result;
- timestamp and relevant state version.

Runbook Relay stores these receipts in D1 and hash-links their canonical contents. This does not replace a signed or independently anchored production audit system. It makes the interaction understandable and exposes mismatches between what the model claims and what the service recorded.

## Design the fallback honestly

Emerging browser capabilities are not available everywhere. A demo can include a simulator that calls the same server API. The simulator must be labeled clearly. It proves the state transitions and control logic, not native browser tool discovery.

That distinction matters. A convincing simulation is useful evidence when it states exactly what it proves.

## The broader principle

Agent-friendly design is not about removing the interface. It is about making supported operations explicit while preserving human comprehension and control.

Pixels remain valuable. They show context, trends, alternatives, and consequences. Structured tools add contracts. Policy and approval bound the action. Receipts connect the machine path back to the shared page.

The result is not a website that an agent can secretly operate. It is a control surface where a human and an agent can work from the same evidence.

The companion project for this article is [Runbook Relay](/projects/runbook-relay/).
