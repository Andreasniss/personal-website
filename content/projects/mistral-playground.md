---
title: "Mistral Reliability Lab"
description: "An inspectable Python reference for bounded tool use, provider switching, resilience, observability, and deterministic evaluation."
role: "Creator and repository owner"
year: 2026
weight: 30
featured: true
statusLabel: "Reference lab"
tags:
  - Mistral
  - OpenTelemetry
  - Python
repoURL: "https://github.com/Andreasniss/Mistral-playground"
image: "/images/projects/mistral-reliability-lab.png"
imageAlt: "GitHub repository preview for the Mistral Reliability Lab Python project."
socialImage: "/images/social/mistral-reliability-lab.png"
socialImageAlt: "Mistral Reliability Lab, an evidence-led agent reliability reference by Andreas Nissen."
hideDetailImage: true
relatedArticleURL: "/writing/agentic-ai-after-the-demo/"
relatedArticleTitle: "The Hard Part of Agentic AI Starts After the Demo"
evidenceReady: true
lastVerified: "2026-08-31"
proofStats:
  - value: "26"
    label: "credential-free tests"
    url: "https://github.com/Andreasniss/Mistral-playground/tree/main/tests"
  - value: "6"
    label: "deterministic eval cases"
    url: "https://github.com/Andreasniss/Mistral-playground/blob/main/evals/cases.json"
  - value: "4"
    label: "maximum tool rounds"
    url: "https://github.com/Andreasniss/Mistral-playground/blob/main/config.py"
  - value: "0"
    label: "credentials for preview"
    url: "https://github.com/Andreasniss/Mistral-playground/blob/main/tests/test_streamlit_app.py"
reviewerPath:
  - title: "Clone the locked project"
    action: "Run git clone, then uv sync --locked --dev."
    expected: "The committed lockfile resolves the reviewed development environment."
  - title: "Launch the credential-free preview"
    action: "Run uv run streamlit run demo_streamlit.py."
    expected: "The interface labels itself Credential-free preview when no provider key is configured."
  - title: "Exercise a grounded route"
    action: "Select How many vacation days do employees receive?"
    expected: "The response cites the fictional policy source and exposes the policy route, tool name, latency, and no-provider-call state."
  - title: "Run the regression gates"
    action: "Run uv run pytest -q and uv run python -m evals.run_evals."
    expected: "All 26 tests and all 6 deterministic cases pass without credentials."
  - title: "Reset the reviewer state"
    action: "Select Clear conversation in the sidebar."
    expected: "The conversation is removed and the supplied reviewer prompts remain available."
reviewerFallback: "If you cannot run Python locally, inspect the Streamlit interaction test and versioned evaluation cases. They exercise the same credential-free path without presenting it as a live model evaluation."
reviewerFallbackURL: "https://github.com/Andreasniss/Mistral-playground/blob/main/tests/test_streamlit_app.py"
architectureImage: "/images/projects/mistral-reliability-architecture.svg"
architectureAlt: "Mistral Reliability Lab architecture showing the reviewer interface, model boundary, provider choice, validated tool gate, tools, privacy-first telemetry, and offline verification."
architectureCaption: "The model may propose a tool call. Application code validates and executes only allow-listed tools, while tests and evaluations verify the deterministic boundary without provider credentials."
evidenceRows:
  - claim: "Tool execution is bounded"
    implementation: "Narrow JSON schemas, an application allow-list, and a four-round ceiling"
    url: "https://github.com/Andreasniss/Mistral-playground/blob/main/demo_streamlit.py"
    linkLabel: "Inspect the tool gate"
  - claim: "Preview behavior is reproducible"
    implementation: "A deterministic credential-free path plus six versioned routing and grounding cases"
    url: "https://github.com/Andreasniss/Mistral-playground/blob/main/evals/cases.json"
    linkLabel: "Review the eval cases"
  - claim: "The reviewer flow is tested"
    implementation: "Streamlit AppTest renders the page and completes a grounded policy prompt"
    url: "https://github.com/Andreasniss/Mistral-playground/blob/main/tests/test_streamlit_app.py"
    linkLabel: "Read the interaction test"
  - claim: "Telemetry excludes content by default"
    implementation: "Regression tests keep prompts, responses, tool arguments, and tool results out of logs"
    url: "https://github.com/Andreasniss/Mistral-playground/blob/main/tests/test_main.py"
    linkLabel: "Inspect privacy tests"
  - claim: "Locked dependencies are audited"
    implementation: "CI exports the committed runtime lock and fails closed on collection or vulnerability errors"
    url: "https://github.com/Andreasniss/Mistral-playground/blob/main/.github/workflows/ci.yml"
    linkLabel: "Inspect the CI gate"
limitations:
  - "The six offline cases test deterministic routing and grounding boundaries, not model quality."
  - "The employee policy is fictional and deliberately small; retrieval uses transparent token overlap rather than a vector database."
  - "Preview mode does not call a provider or fabricate live weather. Connected behavior requires Mistral credentials or a local Ollama model."
  - "The FastAPI authentication pattern is suitable for a local reference, not a public multi-tenant service."
---

## The problem

A model API quickstart proves that a request can return text. It does not prove that tool execution is bounded, failures are handled deliberately, model behavior is testable, or dependency risk is visible.

## What I built

Mistral Reliability Lab is a modular Python reference with a reviewer-first Streamlit interface, a FastAPI surface, opt-in OpenTelemetry tracing, and support for both Mistral's API and local Ollama models. Its credential-free preview lets a reviewer inspect the interaction model without supplying an API key.

The model boundary centralizes calls and implements bounded retry behavior for transient failures. Tool execution uses an explicit allow-list and bounded loops. The interface exposes tool names, arguments, results, and multi-turn history while operational logs and traces exclude prompt, response, and tool-result content by default.

## What it demonstrates

- Provider choice can stay behind a small, explicit interface.
- Tool access and reasoning loops should be bounded before a model can act.
- Credential-free tests can exercise routing, grounding, tool use, and failure handling.
- Observability can remain useful without collecting model content by default.
- CI can audit the exact locked runtime dependency set instead of an approximate environment.
