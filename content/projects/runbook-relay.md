---
title: "Runbook Relay WebMCP Demo"
description: "Stage an incident mitigation, try it without approval, then inspect the server rejection and receipt. A no-setup simulator makes the synthetic workflow easy to review."
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
demoURL: "https://runbook-relay.andreasnissen.dev"
demoLabel: "No-setup demo"
socialImage: "/images/social/runbook-relay.png"
socialImageAlt: "Runbook Relay, a governed WebMCP incident-response control room by Andreas Nissen."
hideDetailImage: true
relatedArticleURL: "/writing/from-browser-tool-to-governed-workflow/"
relatedArticleTitle: "Why Browser Agent Governance Belongs on the Server"
evidenceReady: true
lastVerified: "2026-09-04"
proofStats:
  - value: "5"
    label: "bounded WebMCP tools"
    url: "https://github.com/Andreasniss/runbook-relay-webmcp/blob/main/app/page.tsx"
  - value: "30"
    label: "automated tests"
    url: "https://github.com/Andreasniss/runbook-relay-webmcp/tree/main/tests"
  - value: "50"
    label: "versioned eval tasks"
    url: "https://github.com/Andreasniss/runbook-relay-webmcp/blob/main/evals/live-tool-use/cases.json"
  - value: "18"
    label: "adversarial eval tasks"
    url: "https://github.com/Andreasniss/runbook-relay-webmcp/blob/main/evals/live-tool-use/README.md"
  - value: "0"
    label: "external systems changed"
    url: "https://github.com/Andreasniss/runbook-relay-webmcp/blob/main/docs/architecture.md"
reviewerPath:
  - title: "Open the durable incident"
    action: "Open the live demo on desktop and review incident INC-2841, the correlated change, server status, resource version, and receipt-chain state."
    expected: "The page loads one session-scoped incident from the server control plane rather than treating React state as authority."
  - title: "Stage the lowest-risk mitigation"
    action: "Use native Site tools when available, or the labeled simulator, to compare options and stage Restore database pool limit."
    expected: "The server increments the resource version and binds the proposal to an action digest and idempotency key."
  - title: "Prove the negative path"
    action: "Attempt execution before approving, or select Run the one-click safety proof."
    expected: "Execution fails closed and a durable blocked receipt appears."
  - title: "Approve, execute, and replay"
    action: "Approve the exact staged action in the page, execute it, then repeat the execution request."
    expected: "The first request stores the synthetic result; the exact retry returns it without applying the action twice."
  - title: "Run the repository gates"
    action: "Clone the repository, run npm ci, npm run lint, npm run typecheck, npm run eval:validate, and npm test with Node.js 22.13 or newer."
    expected: "The production build succeeds, both D1 migrations package correctly, all 30 tests pass, and the 50-task contract validates."
reviewerFallback: "The repository tests and deterministic evaluation fixture expose the same policy decisions without claiming native WebMCP discovery or live-model performance."
reviewerFallbackURL: "https://github.com/Andreasniss/runbook-relay-webmcp/tree/main/tests"
architectureImage: "/images/projects/runbook-relay-architecture.svg"
architectureAlt: "Runbook Relay architecture showing browser-agent and human inputs converging on a same-origin server API, policy guards, Cloudflare D1, and a synthetic executor."
architectureCaption: "Native WebMCP, the labeled simulator, and page controls call one server policy boundary. D1 persists session state, scoped approvals, executions, and hash-linked receipts."
evidenceRows:
  - claim: "Policy is enforced server-side"
    implementation: "Every tool and page mutation calls one same-origin API; React state only renders the durable snapshot"
    url: "https://github.com/Andreasniss/runbook-relay-webmcp/blob/main/app/api/control-plane/route.ts"
    linkLabel: "Inspect the API boundary"
  - claim: "Approval is bound to exact state"
    implementation: "The record includes session identity, SHA-256 action digest, resource version, five-minute expiry, and consumption time"
    url: "https://github.com/Andreasniss/runbook-relay-webmcp/blob/main/db/control-plane.ts"
    linkLabel: "Inspect the control plane"
  - claim: "Exact retries do not duplicate the synthetic effect"
    implementation: "A session-specific idempotency key returns the stored result for an exact replay and rejects conflicting reuse"
    url: "https://github.com/Andreasniss/runbook-relay-webmcp/blob/main/tests/control-plane.test.mjs"
    linkLabel: "Review the policy tests"
  - claim: "Audit records expose integrity"
    implementation: "D1 receipts are append-only by application policy, hash-linked, content-verified, and guarded by the receipt-chain head"
    url: "https://github.com/Andreasniss/runbook-relay-webmcp/blob/main/docs/architecture.md"
    linkLabel: "Read the architecture"
  - claim: "Tool access remains narrow"
    implementation: "Five tools separate read, compare, stage, execute, and reset with bounded schemas and no approval operation"
    url: "https://github.com/Andreasniss/runbook-relay-webmcp/blob/main/app/page.tsx"
    linkLabel: "Inspect the tool contracts"
  - claim: "Model evidence has a publication gate"
    implementation: "Fifty versioned tasks capture traces, policy grades, tokens, latency, estimated cost, request IDs, and required human labels"
    url: "https://github.com/Andreasniss/runbook-relay-webmcp/blob/main/evals/live-tool-use/README.md"
    linkLabel: "Review the eval contract"
limitations:
  - "The external action changes a deterministic incident fixture, not production infrastructure."
  - "The server-issued session is an anonymous scoped capability, not authenticated workforce identity or an enterprise role."
  - "The approval endpoint binds exact state, but it cannot independently prove that a human rather than browser automation initiated the page click."
  - "Receipt hashes detect inconsistent records in the returned segment; they cannot expose a rewrite of both records and hashes by someone controlling the store."
  - "The 50-task runner uses an in-process tool fixture and has no published live-model result. It does not evaluate native browser discovery or establish model performance."
  - "The labeled simulator proves application behavior, not native browser discovery; no MCP-B bridge has been tested."
---

## Start with the no-setup demo

Open the [live Runbook Relay demo](https://runbook-relay.andreasnissen.dev) in any browser and select **Run the one-click safety proof**. The simulator reads the incident, compares predefined mitigations, stages the lowest-risk option, and attempts execution. The server blocks that attempt until page approval records the exact action.

This path needs no ChatGPT or Claude setup, account, extension, or local MCP server. It proves the application's server-side policy and durable evidence path. It does not prove that a browser or external client discovered the native WebMCP tools.

To test native WebMCP, use the setup instructions shown in the demo and inspect its registration status. An external MCP client without native page-tool discovery needs a compatible transport. Runbook Relay does not bundle or claim a tested MCP-B bridge.

## The problem

Agent tool demos often place the most important policy in the same client state the agent can influence. A model may be told to ask before acting, but the service still lacks a durable answer to five questions: who approved what, for which version, until when, and whether it already ran.

Runbook Relay makes those questions inspectable in one synthetic incident workflow.

## My role and key decision

I own the intent, architecture, requirements, evaluation criteria, risk, and release decisions, and review merged changes. AI tools assisted with implementation and documentation. The key architectural change was moving approval and execution state from the browser into a durable server service, so all interaction routes face the same policy checks.

## What I built

The page exposes five bounded WebMCP tools for reading an incident, comparing three predefined mitigations, staging one action, requesting execution, and resetting the fixture. Native WebMCP calls, the labeled simulator, and human page controls all use the same `/api/control-plane` endpoint.

Cloudflare D1 stores four record types: session state, approvals, executions, and receipts. Staging increments the resource version, calculates an immutable action digest, and derives a session-specific idempotency key. Approval binds that exact state for five minutes. A new execution is blocked if session identity, digest, version, expiry, consumption, or replay state does not match.

The exact retry returns the first stored result. A conflicting key is rejected. Compare-and-swap guards prevent a stale request from appending a receipt for a mutation it did not win. The latest returned receipt-chain segment is checked for both link continuity and content-hash integrity.

## Evaluation contract

The repository includes 50 versioned live-model tasks across observation, comparison, staging, unauthorized execution, approved execution, reset, and out-of-scope requests. Eighteen are adversarial. The runner requires an explicit API key, pinned model, and current pricing inputs, then records tool traces, request IDs, latency, tokens, cost, automatic policy grades, and a human-label template.

The task definitions and runner are inspectable. No completed live-model result is published. The runner uses an in-process fixture; a native browser comparison would require additional adapters and live runs. Report successful operational tasks separately from successful safety denials.

## Why the boundary matters

A tool description that says “human approval required” is guidance. Runbook Relay moves the decision to server state the model cannot create through its tool catalog. A chat message claiming approval does not change that state.

The demo binds approval to an anonymous browser session. A browser agent with page controls could still press the approval button. Production authorization needs authenticated identity and confirmation appropriate to the action. Likewise, a stored synthetic result does not establish exactly-once behavior against an external infrastructure API; that requires downstream idempotency and reconciliation of uncertain outcomes.

## Deployment choice

The canonical public deployment is live on Cloudflare Workers at [runbook-relay.andreasnissen.dev](https://runbook-relay.andreasnissen.dev). Its protected GitHub Actions path resolves the existing D1 binding, applies migrations, and deploys the Worker and custom domain. DNS, TLS, desktop and narrow rendering, the simulator policy flow, reset, durable evidence, and console output were verified on 4 September 2026. The previous [ChatGPT Sites deployment](https://runbook-relay-webmcp.andreas-nissen.chatgpt.site) remains only as a temporary rollback path.

## What it demonstrates

- Page tools can share a visible human workspace while policy remains server-authoritative.
- Approval can be scoped to identity, exact parameters, version, expiry, and one execution.
- Idempotency and stale-state checks can turn retries into explicit control decisions.
- Hash-linked receipts make the model claim and system record directly comparable.
- Negative and partial-failure paths deserve first-class tests.
- A model evaluation should be versioned and costed before its result becomes a portfolio claim.

This is a reference application, not a production operations console. A production system would add workforce authentication and authorization, strong human confirmation, scoped infrastructure credentials, independently anchored audit, data governance, recovery orchestration, and resilience.

## Related writing

[Why Browser Agent Governance Belongs on the Server](/writing/from-browser-tool-to-governed-workflow/) explains the control-plane migration. [Screen Use vs WebMCP](/writing/screen-use-vs-webmcp/) compares interface paths without inventing benchmark results. [The Cheapest AI Model Is Not Always the Cheapest System](/writing/hidden-token-tax-agent-tools/) connects tool design to outcome-based efficiency measurement.
