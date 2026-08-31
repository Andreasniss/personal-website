---
title: "Screen Use vs WebMCP: What Changes When an Agent Gets Governed Tools"
date: 2026-08-31
description: "Screen use helps an agent operate an interface. WebMCP gives the interface a typed action boundary. Reliable systems need to understand the difference."
primaryTopic: "Tool interfaces"
evidenceLabel: "Tested project analysis"
lastVerified: 2026-08-31
keyPoints:
  - "Screen use interprets a presentation layer; WebMCP exposes an explicit operation layer."
  - "Typed tools improve inspectability, but authorization must still be enforced outside the model."
  - "Runbook Relay proves the control structure with deterministic tests, not a general browser-performance benchmark."
proofLinks:
  - label: "Inspect Runbook Relay"
    url: "https://github.com/Andreasniss/runbook-relay-webmcp"
  - label: "Read the contract tests"
    url: "https://github.com/Andreasniss/runbook-relay-webmcp/blob/main/tests/app-contract.test.mjs"
socialImage: "/images/social/screen-use-vs-webmcp.png"
socialImageAlt: "Screen Use vs WebMCP: What Changes When an Agent Gets Governed Tools, an article by Andreas Nissen."
tags:
  - WebMCP
  - browser agents
  - tool design
  - human approval
origin: "website"
featured: true
draft: false
image: "/images/articles/screen-use-vs-webmcp.svg"
imageAlt: "Two interface paths: screen interpretation on one side and typed governed tools on the other, both meeting at a shared human approval boundary."
relatedProjectURL: "/projects/runbook-relay/"
relatedProjectTitle: "Runbook Relay WebMCP Demo"
repoURL: "https://github.com/Andreasniss/runbook-relay-webmcp"
series: "Reliable Agent Systems"
seriesOrder: 4
---

Screen use and WebMCP solve different parts of the agent-interface problem.

Screen use lets an agent interpret and operate the interface a person already uses. WebMCP lets the application expose typed operations designed for an agent to call. One starts from presentation. The other starts from an action contract.

That distinction changes what the system can validate, observe, and control. It does not make one approach universally better. It tells us where each approach belongs.

## Screen use begins with presentation

A screen-using agent sees rendered state. It can read text, interpret layout, select controls, and navigate a workflow. This is valuable because most software was built for people, not agents. The agent can work with an existing interface without waiting for a dedicated integration.

The trade-off is inference. The agent must infer which information matters, which control maps to the requested outcome, whether a button is currently safe to press, and whether the interface changed after the last observation.

That makes screen use broad and adaptable. It also means the action boundary is often implicit. A person may understand that a red button is consequential because of its label, position, and surrounding text. A machine needs to derive that meaning from the current page state.

## WebMCP begins with operations

WebMCP gives a page another interface: named tools with descriptions, structured inputs, declared outputs, and behavioral annotations. The human interface remains visible. The page also states what operations exist in a form an agent can inspect directly.

In Runbook Relay, the distinction is concrete. The page exposes separate tools to read an incident, compare mitigations, stage a change, execute an approved change, and reset the simulation. The agent does not need to infer those operations from button position or styling.

The tool boundary also makes negative behavior easier to specify. There is no tool that grants approval. Execution checks page state and fails closed until a human has approved the staged action.

## What structurally changes

| Concern | Screen use | Governed WebMCP tool |
|---|---|---|
| Discovery | Interpret visible controls and text | Read a named tool catalog |
| Inputs | Derive values from the interface | Validate against a JSON schema |
| Intent | Infer the meaning of a click | Call an operation with a stated purpose |
| Result | Inspect the changed screen | Receive a structured result and inspect the screen |
| Safety signal | Read labels, warnings, and page state | Combine annotations with runtime authorization |
| Audit | Reconstruct actions from interaction traces | Record tool name, input, caller, policy result, and output |

The biggest change is not convenience. It is inspectability. A reviewer can reason about a finite set of declared operations and test the contract around each one.

## A tool declaration is not authorization

Typed tools make policy intent clearer. They do not enforce policy by themselves.

A description that says “human approval required” is guidance. An annotation that marks an operation as consequential is useful metadata. The execution path still needs to check identity, scope, approval state, and current resource state at the action boundary.

Runbook Relay demonstrates this rule in a deterministic browser simulation. The model-facing layer can stage a predefined mitigation. Only the human-facing control records approval. The execution function rejects a call made before that approval.

In a production system, the same control belongs on the server side. Approval records should be bound to an authenticated identity, exact parameters, an expiry, and the current resource version. Audit records should be durable and tamper evident.

## What the project proves, and what it does not

The public repository and contract tests prove a narrow set of properties:

- five tools have explicit schemas and separate responsibilities;
- no model-callable approval operation exists;
- execution checks approval and blocks the negative path;
- human actions and tool calls use the same application state;
- the simulation resets to a deterministic fixture.

They do not prove that WebMCP is faster than screen use, that every model selects the correct tool, or that a client-side approval is production-grade security. Those questions require a separate browser and model evaluation across repeated tasks.

## How I would compare the approaches empirically

A useful evaluation should hold the task and evidence constant, then vary only the interface path. For each run, record:

1. task completion and final-state correctness;
2. number of observations and actions;
3. elapsed time and model usage;
4. unsupported or malformed actions;
5. approval-bypass attempts;
6. recovery after stale or changed state;
7. completeness of the resulting audit record.

That evaluation is the next step. It should publish prompts, fixtures, model and browser versions, run counts, and failure examples. Until then, the defensible conclusion is structural: governed tools make the operation boundary explicit and testable.

## Use both layers deliberately

Screen use remains important. Agents need it for discovery, unfamiliar interfaces, and workflows that do not expose structured operations. WebMCP becomes useful when an application knows which operations matter and wants to make their contracts visible.

The strongest design keeps both views aligned. The human sees evidence, state, and approval controls. The agent gets narrow tools over the same state. The service enforces authorization regardless of which interface initiated the request.

The goal is not to remove the screen. It is to stop making pixels carry the entire control contract.
