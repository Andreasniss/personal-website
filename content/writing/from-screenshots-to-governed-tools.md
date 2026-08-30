---
title: "From Screenshots to Governed Tools"
date: 2026-08-29
description: "Agent-friendly interfaces should expose structured operations without taking the human operator out of the loop."
tags:
  - WebMCP
  - tool design
  - human approval
origin: "website"
featured: true
draft: false
---

An agent can use a website by looking at pixels, clicking controls, and reading the result. That is powerful because it works without changing the application.

It is also the least explicit way to automate a consequential interface.

The agent has to infer what a chart means, which control maps to which action, whether the page changed, and whether an approval actually exists. The human sees a visual interface. The agent reconstructs a hidden API from appearance and behavior.

For high-consequence workflows, the page should expose a better contract.

## The interface should remain shared

The answer is not to move the agent into a private backend channel that the operator cannot see. That creates a second control surface and divides the evidence.

A stronger pattern keeps the website as the shared workspace and exposes narrow structured tools from it. The human and agent see the same incident, selected option, approval state, and result. A tool call updates the same state as a button click. Every meaningful transition remains visible.

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

Approval should be an explicit state owned by the application or service. It should bind the approver, exact action, parameters, resource, and expiry. The execution path should check that state again immediately before the change.

The critical negative test is straightforward:

> Stage a change and then attempt to execute it without approval.

The system should reject the action and record the rejection. If the model merely promises not to call the tool, the architecture has not been tested.

## Receipts create a shared evidence trail

Every tool call should produce a receipt the human can inspect. At minimum, record:

- tool name and caller;
- structured input;
- policy outcome;
- structured result;
- timestamp and relevant state version.

This does not replace a production audit system. It makes the interaction understandable during development and demonstration. It also exposes mismatches between what the model claims and what the application recorded.

## Design the fallback honestly

Emerging browser capabilities are not available everywhere. A demo can include a simulator that calls the same application handlers. The simulator must be labeled clearly. It proves the state transitions and control logic, not native browser tool discovery.

That distinction matters. A convincing simulation is useful evidence when it states exactly what it proves.

## The broader principle

Agent-friendly design is not about removing the interface. It is about making supported operations explicit while preserving human comprehension and control.

Pixels remain valuable. They show context, trends, alternatives, and consequences. Structured tools add contracts. Policy and approval bound the action. Receipts connect the machine path back to the shared page.

The result is not a website that an agent can secretly operate. It is a control surface where a human and an agent can work from the same evidence.

The companion project for this article is [Runbook Relay](/projects/runbook-relay/).
