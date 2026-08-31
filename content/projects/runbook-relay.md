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
image: "/images/projects/runbook-relay-webmcp.png"
imageAlt: "Repository preview for Runbook Relay, a human-guided incident response demo with governed WebMCP tools."
relatedArticleURL: "/writing/from-screenshots-to-governed-tools/"
relatedArticleTitle: "From Screenshots to Governed Tools"
---

## The problem

Incident dashboards are dense, stateful, and consequential. Screenshot-driven automation has to infer what a chart means, which change is selected, and whether an operator approved execution. That is too much ambiguity for an operational control surface.

## What I built

Runbook Relay exposes narrow WebMCP tools for reading an incident, comparing mitigations, staging a change, executing an approved change, and resetting the simulation. The tools and the human interface use the same state transitions.

The central control is deliberate: the agent can stage a mitigation, and it cannot approve its own change. Execution fails closed until the page records explicit human approval.

## What it demonstrates

- A web interface can become directly usable by an agent without disappearing from the human operator.
- Read, stage, approve, execute, and verify are separate phases.
- Tool schemas reduce ambiguity while visible receipts preserve shared evidence.
- A negative test is part of the demo: execution without approval must fail visibly.

## Proof

- [Open the live application](https://runbook-relay-webmcp.andreas-nissen.chatgpt.site)
- [Inspect the source repository](https://github.com/Andreasniss/runbook-relay-webmcp)

This is a reference application, not a production operations console. A production implementation would enforce authorization and approvals server-side, bind actions to scoped identities, and persist tamper-evident audit records.
