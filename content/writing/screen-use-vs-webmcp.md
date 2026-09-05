---
title: "Screen Use vs WebMCP: What Changes When an Agent Gets Governed Tools"
date: 2026-08-31
description: "Choose an interaction route by application ownership, task stability, and client support. Both screen controls and page tools need the same server authorization."
primaryTopic: "Tool interfaces"
evidenceLabel: "Tested project analysis"
evidenceBoundary: "Runbook Relay proves the structural tool contract and a durable server control plane over a synthetic action. It does not provide enterprise identity, repeated live-model trials, or an empirical comparison of screen use, native WebMCP, and bridged clients."
lastVerified: 2026-09-05
lastmod: 2026-09-05
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

If you cannot change an application, a browser agent may need to use its existing controls. If you own the application and repeatedly automate the same task, a named operation with a bounded input schema may be easier to inspect and maintain.

That is the useful starting point for comparing screen use and WebMCP. It is an interface decision. Either route can reach a well-governed service, and either can reach a poorly governed one.

| Your situation | Route to consider | What to verify first |
|---|---|---|
| Unfamiliar application you do not control | Existing browser interface | Agent can identify the right controls and verify the outcome |
| Repeated task in an application you own | Structured page tools alongside the UI | Tool contract is stable and the intended client supports discovery |
| Visual interpretation is part of the task | Screen observations plus tools where useful | Both routes describe the same current state |
| External MCP client needs page tools | An explicitly supported transport | Origin, session isolation, client compatibility, and approval behavior |

Runbook Relay is my reference application for examining those boundaries. It is not a benchmark establishing which route performs better.

## Try the difference before you install anything

Open the [Runbook Relay demo](https://runbook-relay.andreasnissen.dev) in any browser and select **Run the one-click safety proof**. A built-in agent simulator reads the incident, compares bounded mitigations, stages one option, and attempts execution. The server rejects the attempt until page approval records the exact action.

This no-setup path demonstrates the application's policy boundary and durable receipts. It does not demonstrate native tool discovery. For that second test, use the setup instructions in the demo and inspect its native-registration status. Client support and configuration must be recorded with the result.

An external client that exposes MCP connectivity without native page-tool discovery needs an additional page-to-MCP transport, such as an MCP-B extension or local relay. Runbook Relay does not bundle or claim that path as tested. That distinction matters because a successful relay test proves compatibility through the relay, not native WebMCP support in the client.

## Screen use begins with presentation

A screen-using agent interprets rendered state. Some clients also inspect the DOM or accessibility information. Depending on its interface, it can read, select controls, and navigate software built for people without a dedicated integration.

The trade-off is inference. The agent must infer which information matters, which control maps to the requested outcome, whether a button is currently safe to press, and whether the interface changed after the last observation.

That makes screen use broad and adaptable. It also means the action boundary is often implicit. A person may understand that a red button is consequential because of its label, position, and surrounding text. A machine needs to derive that meaning from the current page state.

## WebMCP begins with operations

The [WebMCP Community Group draft](https://webmachinelearning.github.io/webmcp/) describes a JavaScript interface for page tools with names, descriptions, input schemas, execution callbacks, and annotations. It is not a W3C Standard. The human interface remains visible, while the page exposes operations an agent can inspect directly. Runbook Relay returns structured application results from those operations.

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
| Inputs | Enter values through page controls and their validation | Supply arguments under an explicit schema |
| Intent | Infer the meaning of a click | Call an operation with a stated purpose |
| Result | Inspect the changed screen | Receive a structured result and inspect the screen |
| Safety signal | Read labels, warnings, and page state | Read tool descriptions and supported annotations |
| Authorization | Enforced by the service behind page controls | Enforced by the service behind tool calls |
| Audit | Application records plus browser interaction traces | Application records plus structured tool-call traces |

The added contract makes operations explicit at the agent-facing interface. It does not imply that the original UI lacks validation or audit records. A fair comparison uses the same backend controls on both routes.

## A tool declaration is not authorization

“Human approval required” in a tool description is a sign on the door. The service still needs the lock: checks for identity, scope, approval, and current resource state before execution.

Runbook Relay demonstrates this rule with a server-side control plane over a deterministic incident. The model-facing layer can stage a predefined mitigation. Only the page approval path can create the session-bound approval record. The execution function rejects a call made before that approval.

The project binds approval to an anonymous session, exact action, resource version, expiry, and one execution. A browser agent may still be able to click the page approval button, so this does not prove human presence. The [server-governance article](/writing/from-browser-tool-to-governed-workflow/) explains the enforcement and production limitations.

## What the project proves, and what it does not

The repository provides five tools with explicit schemas, a shared server control plane, and a deterministic reset. Contract tests cover approval rejection, idempotency, stale state, expiry, consumption, replay, and partial failures. D1 persists approvals, executions, and hash-linked receipts.

Its evaluation contract defines 50 tasks across seven categories, including 18 adversarial cases. Structural budgets cover the five definitions and a four-call negative path. These are inspectable contracts and deterministic checks, not comparative model-performance results.

The repository also documents the standard page layer separately from optional compatibility and transport layers. It does not yet prove that Claude Desktop, Cursor, or another external MCP client can complete the workflow through a bridge.

The [agent-interface measurement](https://github.com/Andreasniss/runbook-relay-webmcp/blob/main/docs/agent-efficiency.md) reports serialized UTF-8 bytes rather than model tokens. That makes it a reproducible regression guard for contract growth, not a claim that WebMCP is faster than screen use. The implemented 50-task harness has no published live-model result. It also does not turn an anonymous browser session into authenticated human authorization.

## How I would compare the approaches empirically

A useful evaluation should hold the task, initial application state, model version, reasoning settings, authorization, and overall budget constant, then vary the interface path. Repeat matched cases and alternate run order to reduce ordering effects. If the clients cannot use the same model, report a comparison of complete configurations rather than attributing the difference to WebMCP alone. For each run, record:

1. task completion and final-state correctness;
2. number of observations and actions;
3. elapsed time and model usage;
4. unsupported or malformed actions;
5. approval-bypass attempts;
6. recovery after stale or changed state;
7. completeness of the resulting audit record.

The interface matrix should also record whether each run used native WebMCP, a polyfill, or an MCP-B transport. Client, browser, transport, and version belong in the result. Otherwise a successful relay test can be mistaken for native browser support.

Report cost and model usage per verified task completion, with all failed attempts included. Show completion rate alongside that denominator. Report blocked pre-approval execution separately as a successful safety outcome; mixing denials with completed operational tasks can hide a system that refuses legitimate work.

The repository already contains versioned prompts, fixtures, a grader, a human-label rubric, and a result schema. Its runner uses an in-process tool fixture. It does not yet implement the matched screen, native-browser, and bridge experiment described above. That comparison requires additional adapters and repeated live runs before any interface advantage can be claimed.

## Use both layers deliberately

Screen use remains important. Agents need it for discovery, unfamiliar interfaces, and workflows that do not expose structured operations. WebMCP becomes useful when an application knows which operations matter and wants to make their contracts visible.

Keep both views aligned: people see evidence and approval controls; agents get narrow tools over the same state. Choose the interface you can support and measure, with service authorization enforced for both clicks and tool calls.

[The Cheapest AI Model Is Not Always the Cheapest System](/writing/hidden-token-tax-agent-tools/) develops the measurement model for definitions, results, round trips, recovery, and verified outcomes.
