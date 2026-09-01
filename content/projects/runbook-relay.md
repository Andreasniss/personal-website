---
title: "Runbook Relay WebMCP Demo"
description: "A WebMCP incident-response control room where a human and an AI agent share evidence, approval state, and an audit log."
role: "Creator and repository owner"
year: 2026
weight: 10
featured: true
statusLabel: "Live demo"
tags:
  - WebMCP
  - human approval
  - agent controls
repoURL: "https://github.com/Andreasniss/runbook-relay-webmcp"
demoURL: "https://runbook-relay-webmcp.andreas-nissen.chatgpt.site"
demoLabel: "ChatGPT Sites demo"
image: "/images/projects/runbook-relay-webmcp.png"
imageAlt: "Runbook Relay interface showing an active incident, the WebMCP tool model, desktop setup steps, and the human-approval boundary."
socialImage: "/images/social/runbook-relay.png"
socialImageAlt: "Runbook Relay, a governed WebMCP incident-response control room by Andreas Nissen."
hideDetailImage: true
relatedArticleURL: "/writing/screen-use-vs-webmcp/"
relatedArticleTitle: "Screen Use vs WebMCP"
evidenceReady: true
lastVerified: "2026-09-01"
proofStats:
  - value: "5"
    label: "bounded WebMCP tools"
    url: "https://github.com/Andreasniss/runbook-relay-webmcp/blob/main/app/page.tsx"
  - value: "10"
    label: "contract tests"
    url: "https://github.com/Andreasniss/runbook-relay-webmcp/tree/main/tests"
  - value: "2,557 B"
    label: "measured agent path"
    url: "https://github.com/Andreasniss/runbook-relay-webmcp/blob/main/docs/agent-efficiency.md"
  - value: "1"
    label: "human-only approval gate"
    url: "https://github.com/Andreasniss/runbook-relay-webmcp/blob/main/docs/threat-model.md"
  - value: "0"
    label: "external systems changed"
    url: "https://github.com/Andreasniss/runbook-relay-webmcp/blob/main/docs/architecture.md"
reviewerPath:
  - title: "Open the deterministic incident"
    action: "Open the live demo on desktop and review incident INC-2841, the correlated change, and the three mitigation options."
    expected: "The page exposes one shared incident state, current telemetry, approval state, and decision log."
  - title: "Stage the lowest-risk mitigation"
    action: "Use native Site tools when available, or the labeled simulator, to compare options and stage Restore database pool limit."
    expected: "The mitigation is staged for review, but no recovery action runs."
  - title: "Prove the negative path"
    action: "Attempt execution before approving, or select Run the blocked-action proof."
    expected: "Execution fails closed and the blocked result appears in the visible receipt and decision log."
  - title: "Approve and execute"
    action: "Select Approve staged change in the page, then execute the approved mitigation."
    expected: "The simulation records the human approval and recovers to 1.2 s latency, 0.6% errors, and 51% saturation."
  - title: "Run the repository gate"
    action: "Clone the repository, run npm ci, npm run lint, and npm test with Node.js 22.13 or newer."
    expected: "The production build succeeds and all seven contract tests pass."
reviewerFallback: "The browser-independent proof and contract test expose the same blocked-before-approval boundary without claiming native WebMCP discovery."
reviewerFallbackURL: "https://github.com/Andreasniss/runbook-relay-webmcp/blob/main/tests/app-contract.test.mjs"
architectureImage: "/images/projects/runbook-relay-architecture.svg"
architectureAlt: "Runbook Relay architecture showing a browser agent and human operator sharing one state model, visible receipts, a human approval gate, and a deterministic mitigation."
architectureCaption: "Human controls, native WebMCP calls, and the labeled simulator use the same state transitions. The agent can stage work, while approval remains a human-only page action."
evidenceRows:
  - claim: "The agent cannot self-approve"
    implementation: "No approval tool exists; approval is exposed only as a human page interaction"
    url: "https://github.com/Andreasniss/runbook-relay-webmcp/blob/main/docs/threat-model.md"
    linkLabel: "Inspect the threat model"
  - claim: "Execution fails closed"
    implementation: "The execution handler checks recorded approval and emits a blocked receipt when it is absent"
    url: "https://github.com/Andreasniss/runbook-relay-webmcp/blob/main/tests/app-contract.test.mjs"
    linkLabel: "Read the contract test"
  - claim: "Tool access is narrow"
    implementation: "Five tools separate read, compare, stage, execute, and reset operations with bounded JSON Schemas"
    url: "https://github.com/Andreasniss/runbook-relay-webmcp/blob/main/app/page.tsx"
    linkLabel: "Inspect the tool contracts"
  - claim: "Operator evidence stays visible"
    implementation: "Tool receipts record caller, input, policy outcome, structured result, and timestamp"
    url: "https://github.com/Andreasniss/runbook-relay-webmcp/blob/main/README.md"
    linkLabel: "Review the guided demo"
  - claim: "The scenario is reproducible"
    implementation: "A deterministic fixture and reset action change no external system"
    url: "https://github.com/Andreasniss/runbook-relay-webmcp/blob/main/docs/architecture.md"
    linkLabel: "Read the architecture note"
  - claim: "The agent-facing path has a regression budget"
    implementation: "A deterministic gate measures tool-definition bytes, result bytes, call count, and the blocked policy outcome"
    url: "https://github.com/Andreasniss/runbook-relay-webmcp/blob/main/docs/agent-efficiency.md"
    linkLabel: "Review the efficiency measurement"
limitations:
  - "The public demo is a browser-side simulation. It does not authenticate users or execute against infrastructure."
  - "Human approval is demonstrated in page state, not enforced by a server-side policy service."
  - "The visible audit trail is not durable or tamper-evident and resets with the simulation."
  - "The labeled simulator proves application behavior, not native browser discovery of WebMCP tools."
---

## The problem

Incident dashboards are dense, stateful, and consequential. Screenshot-driven automation has to infer what a chart means, which change is selected, and whether an operator approved execution. That is too much ambiguity for an operational control surface.

## What I built

Runbook Relay exposes narrow WebMCP tools for reading an incident, comparing mitigations, staging a change, executing an approved change, and resetting the simulation. The tools and the human interface use the same state transitions.

The central control is deliberate: the agent can stage a mitigation, and it cannot approve its own change. Execution fails closed until the page records explicit human approval.

## Deployment choice

The interactive experience is intentionally hosted on ChatGPT Sites because the project tests how a site can expose governed tools to ChatGPT through WebMCP. This case study and the public repository remain the canonical review surfaces for the architecture, tests, limitations, and implementation. The hosting choice is product context, not a claim that OpenAI reviewed or endorsed the project.

## What it demonstrates

- A web interface can become directly usable by an agent without disappearing from the human operator.
- Read, stage, approve, execute, and verify are separate phases.
- Tool schemas reduce ambiguity while visible receipts preserve shared evidence.
- A negative test is part of the demo: execution without approval must fail visibly.
- A deterministic efficiency gate makes agent-interface growth visible without presenting byte counts as model-token results.

This is a reference application, not a production operations console. A production implementation would enforce authorization and approvals server-side, bind actions to scoped identities, and persist tamper-evident audit records.

## Related writing

[From Screenshots to Governed Tools](/writing/from-screenshots-to-governed-tools/) explains why structured operations should remain connected to the human interface. [Screen Use vs WebMCP](/writing/screen-use-vs-webmcp/) compares the two interface paths and states which benchmark evidence is still missing. [The Hidden Token Tax of Agent Tools](/writing/hidden-token-tax-agent-tools/) connects the project to outcome-based efficiency measurement.
