---
title: "7DayFocus AI Delivery Lab"
description: "A local-first weekly planner with a human-approved AI assistant, bounded proposals, deterministic evaluations, and user-supplied model credentials."
role: "Creator and repository owner"
year: 2026
weight: 20
featured: false
statusLabel: "Private release candidate"
tags:
  - Claude
  - OpenAI
  - evaluations
  - human approval
socialImage: "/images/social/7dayfocus.png"
socialImageAlt: "7DayFocus AI Delivery Lab, a private release candidate by Andreas Nissen."
relatedArticleURL: "/writing/context-and-control/"
relatedArticleTitle: "Context and Control Are Different Layers"
---

## The problem

An AI planner should not silently rewrite a person's week. Model output can be malformed, stale, or incompatible with real scheduling limits, and an API key should not become application data.

## What I built

7DayFocus is a local-first weekly planner with a proposal-only AI assistant. A user can select Anthropic, OpenAI, or OpenRouter, supply a key for one request, and ask the model to rebalance existing tasks. The assistant cannot create, rewrite, delete, complete, or automatically apply tasks.

Every model response passes through a strict proposal contract and the planner's deterministic capacity and priority rules. The interface shows the complete diff and reason for each change. Nothing mutates until the user explicitly approves the proposal, and the entire proposal is rejected if the week changed after generation.

The provider key is held only for the active request, sent through a loopback-only gateway to a fixed provider destination, and then cleared from the interface. It is not stored in browser persistence, exported with planner data, logged, or committed.

## What it demonstrates

- One provider-neutral proposal contract can sit above Anthropic Messages, OpenAI Responses, and OpenRouter Chat Completions.
- Structured model output still needs independent domain validation before it can change state.
- Human approval is a state boundary, not a sentence in a prompt.
- A deterministic fixture can make the full review and approval path inspectable without a provider account or key.
- Threat modeling, lifecycle artifacts, and evaluation cases can stay beside the implementation they govern.

## Evidence and current boundary

The current candidate passes 244 automated tests, including 24 named proposal-evaluation cases, plus lint, type checking, production build, clean-copy reproduction, and a zero-vulnerability dependency audit. Provider-adapter tests use mocked responses; no real credential was used and live-provider behavior is not yet claimed.

The source repository remains private while final review and publication checks are completed. This is an independent reference project, not a production service and not affiliated with or endorsed by Anthropic, OpenAI, OpenRouter, or AWS.
