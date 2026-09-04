---
title: "Screen Use vs WebMCP: What Changes When an Agent Gets Governed Tools"
date: 2026-08-31
description: "Screen use helps an agent operate an interface. WebMCP gives the interface a typed action boundary. Reliable systems need to understand the difference."
primaryTopic: "Tool interfaces"
evidenceLabel: "Tested project analysis"
evidenceBoundary: "Runbook Relay proves the structural tool contract and a durable server control plane over a synthetic action. It does not provide enterprise identity, repeated live-model trials, or an empirical comparison of screen use, native WebMCP, and bridged clients."
lastVerified: 2026-09-04
keyPoints:
  - "Screen use interprets a presentation layer; WebMCP exposes an explicit operation layer."
  - "Typed tools improve inspectability, but authorization must still be enforced outside the model."
  - "Native page tools, compatibility polyfills, and MCP transport bridges are separate layers with separate evidence and security boundaries."
  - "Runbook Relay proves the control structure with deterministic tests, not a general browser-performance benchmark."
proofLinks:
  - label: "Inspect Runbook Relay"
    url: "https://github.com/Andreasniss/runbook-relay-webmcp"
  - label: "Read the contract tests"
    url: "https://github.com/Andreasniss/runbook-relay-webmcp/blob/main/tests/app-contract.test.mjs"
  - label: "Review the agent-interface budget"
    url: "https://github.com/Andreasniss/runbook-relay-webmcp/blob/main/docs/agent-efficiency.md"
  - label: "Inspect the runtime layers"
    url: "https://github.com/Andreasniss/runbook-relay-webmcp/blob/main/docs/architecture.md"
socialImage: "/images/social/screen-use-vs-webmcp.png"
socialImageAlt: "Screen Use vs WebMCP: What Changes When an Agent Gets Governed Tools, an article by Andreas Nissen."
tags:
  - WebMCP
  - browser agents
  - tool design
  - human approval
origin: "website"
featured: false
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

## Try the difference before you install anything

Open the [Runbook Relay demo](https://runbook-relay.andreasnissen.dev) in any browser and select **Run the one-click safety proof**. A built-in agent simulator reads the incident, compares bounded mitigations, stages one option, and attempts execution. The server rejects the attempt until the exact action is approved in the visible page.

This no-setup path demonstrates the application's policy boundary and durable receipts. It does not demonstrate native tool discovery. For that second test, the demo provides the current OpenAI desktop setup instructions and confirms when five native WebMCP tools are registered.

Claude Desktop, Cursor, and other MCP clients need an additional page-to-MCP transport, such as an MCP-B extension or local relay. Runbook Relay does not bundle or claim that path as tested. That distinction matters because a successful relay test proves compatibility through the relay, not native WebMCP support in the client.

## Screen use begins with presentation

A screen-using agent sees rendered state. It can read text, interpret layout, select controls, and navigate a workflow. This is valuable because most software was built for people, not agents. The agent can work with an existing interface without waiting for a dedicated integration.

The trade-off is inference. The agent must infer which information matters, which control maps to the requested outcome, whether a button is currently safe to press, and whether the interface changed after the last observation.

That makes screen use broad and adaptable. It also means the action boundary is often implicit. A person may understand that a red button is consequential because of its label, position, and surrounding text. A machine needs to derive that meaning from the current page state.

## WebMCP begins with operations

WebMCP gives a page another interface: named tools with descriptions, structured inputs, declared outputs, and behavioral annotations. The human interface remains visible. The page also states what operations exist in a form an agent can inspect directly.

In Runbook Relay, the distinction is concrete. The page exposes separate tools to read an incident, compare mitigations, stage a change, execute an approved change, and reset the simulation. The agent does not need to infer those operations from button position or styling.

The tool boundary also makes negative behavior easier to specify. There is no tool that grants approval. Execution checks durable server state and fails closed until the current session has approved the exact staged action.

## WebMCP is not MCP moved into a browser

The execution boundary matters as much as the tool schema. A WebMCP tool belongs to the open page, executes there, and shares the page's current user session. Traditional MCP tools usually belong to an independently deployed server with its own process, authentication, and lifecycle.

Compatibility tooling can connect these worlds without making them the same architecture. [MCP-B's runtime model](https://docs.mcp-b.ai/explanation/architecture/runtime-layering) separates three layers: the standard `document.modelContext` surface, an optional compatibility runtime, and optional transports. Its [bridge architecture](https://docs.mcp-b.ai/explanation/architecture/transports-and-bridges) carries discovery, calls, results, and lifecycle events between the page and another client while tool execution remains in the page.

That distinction creates a useful evidence rule:

| Path | What it demonstrates | What it does not demonstrate |
|---|---|---|
| Native `document.modelContext` | The browser or agent discovers the page's standard tool surface | Compatibility with an external desktop MCP client |
| Polyfilled page API | The application works against the same page contract in an unsupported browser | Native browser implementation |
| Extension, iframe, or local relay | An external MCP client can reach the page tools through that transport | Native WebMCP support in that client |

Runbook Relay currently implements only the first path and a clearly labeled browser-independent simulator. It does not bundle MCP-B. This keeps missing native support visible and prevents a compatibility result from being reported as browser support.

A later provider-neutral evaluation can expose the same five tools to Claude Desktop or Cursor through an MCP-B relay. That path adds security work. Exact origin allowlists, sender and connection identity, relay exposure, and per-session isolation become part of the system boundary. [MCP-B's transport reference](https://docs.mcp-b.ai/packages/transports/reference) explicitly warns against wildcard origins in production and documents separate connection controls for iframe, extension, and relay transports.

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

Runbook Relay demonstrates this rule with a server-side control plane over a deterministic incident. The model-facing layer can stage a predefined mitigation. Only the page approval path can create the session-bound approval record. The execution function rejects a call made before that approval.

The project now binds approval to an anonymous session identity, exact action digest, resource version, five-minute expiry, and one execution. Production still requires authenticated workforce identity, explicit authorization, strong human confirmation, and independently anchored audit evidence.

## What the project proves, and what it does not

The public repository and contract tests prove a narrow set of properties:

- five tools have explicit schemas and separate responsibilities;
- no model-callable approval operation exists;
- execution checks approval and blocks the negative path;
- human actions and tool calls use the same server control plane;
- the simulation resets to a deterministic fixture;
- idempotency, stale-state, expiry, consumption, replay, and partial-failure paths have deterministic tests;
- D1 persists approvals, executions, and hash-linked receipts;
- a 50-task model evaluation contract covers seven task categories, including 18 adversarial cases;
- the five tool definitions and four-call negative path remain inside explicit structural size and call-count budgets.

The repository also documents the standard page layer separately from optional compatibility and transport layers. It does not yet prove that Claude Desktop, Cursor, or another external MCP client can complete the workflow through a bridge.

The [agent-interface measurement](https://github.com/Andreasniss/runbook-relay-webmcp/blob/main/docs/agent-efficiency.md) reports serialized UTF-8 bytes rather than model tokens. That makes it a reproducible regression guard for contract growth, not a claim that WebMCP is faster than screen use. The 50-task harness is now implemented, and it has not run with a live model. It also does not turn an anonymous browser session into authenticated human authorization.

## How I would compare the approaches empirically

A useful evaluation should hold the task and evidence constant, then vary only the interface path. For each run, record:

1. task completion and final-state correctness;
2. number of observations and actions;
3. elapsed time and model usage;
4. unsupported or malformed actions;
5. approval-bypass attempts;
6. recovery after stale or changed state;
7. completeness of the resulting audit record.

The interface matrix should also record whether each run used native WebMCP, a polyfill, or an MCP-B transport. Client, browser, transport, and version belong in the result. Otherwise a successful relay test can be mistaken for native browser support.

The efficiency comparison should divide total model tokens by verified outcomes, not by calls. That prevents a short failed run from looking better than a longer run that reaches the correct final state. For this incident workflow, the grader should treat a blocked pre-approval execution as a successful safety outcome.

The versioned prompts, fixtures, automatic grader, human-label rubric, and result schema now exist in the repository. A publishable run still requires a pinned model, API credential, current pricing, all 50 traces, complete human labels, and representative failures. Until then, the defensible conclusion remains structural: governed tools make the operation boundary explicit and testable.

## Use both layers deliberately

Screen use remains important. Agents need it for discovery, unfamiliar interfaces, and workflows that do not expose structured operations. WebMCP becomes useful when an application knows which operations matter and wants to make their contracts visible.

The strongest design keeps both views aligned. The human sees evidence, state, and approval controls. The agent gets narrow tools over the same state. The service enforces authorization regardless of which interface initiated the request.

The goal is not to remove the screen. It is to stop making pixels carry the entire control contract.

[The Cheapest AI Model Is Not Always the Cheapest System](/writing/hidden-token-tax-agent-tools/) develops the measurement model for definitions, results, round trips, recovery, and verified outcomes.
