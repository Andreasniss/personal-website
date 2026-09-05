---
title: "Agent Reliability Lab"
description: "Inspect how a Python agent validates tool calls, stops bounded loops, and records operational metadata. A credential-free preview separates application checks from live-model behavior."
role: "Creator and repository owner"
year: 2026
weight: 30
featured: true
statusLabel: "Reference lab"
tags:
  - provider switching
  - OpenTelemetry
  - Python
repoURL: "https://github.com/Andreasniss/Mistral-playground"
socialImage: "/images/social/mistral-reliability-lab.png"
socialImageAlt: "Agent Reliability Lab, an evidence-led agent reliability reference by Andreas Nissen."
image: "/images/projects/mistral-reliability-architecture.svg"
imageAlt: "Agent Reliability Lab architecture with provider choice, a validated tool gate, privacy-first telemetry, and offline verification."
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
architectureAlt: "Agent Reliability Lab architecture showing the reviewer interface, model boundary, provider choice, validated tool gate, tools, privacy-first telemetry, and offline verification."
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

## My role and key decision

I own the intent, architecture, requirements, evaluation criteria, risk, and release decisions, and review merged changes. AI tools assisted with implementation and documentation. I kept the provider boundary small so that tool validation, retry behavior, and telemetry could be inspected independently of the model.

## What I built

Agent Reliability Lab is a modular Python reference with a reviewer-first Streamlit interface, a FastAPI surface, opt-in OpenTelemetry tracing, and support for both Mistral's API and local Ollama models. Its credential-free preview lets a reviewer inspect the interaction model without supplying an API key.

The model boundary centralizes calls and implements bounded retry behavior for transient failures. Tool execution uses an explicit allow-list and bounded loops. The interface exposes tool names, arguments, results, and multi-turn history while operational logs and traces exclude prompt, response, and tool-result content by default.

## What to inspect first

Start with the supplied vacation-policy question in credential-free preview. Check that the answer names the fictional source and the interface makes the absence of a provider call visible. Then try a request outside the preview's supported scope. It should state its limit rather than invent live information.

Connected mode uses Mistral or local Ollama and lets the model propose tool calls. The application validates the tool name and arguments, executes an allowed operation, and returns its result for the next model turn. The four-round ceiling bounds that loop. It does not guarantee a correct answer within four rounds.

The repository's verification snapshot is dated 31 August 2026. Its 26 credential-free tests and six deterministic cases cover application behavior; they are not a comparison of the two providers. A useful next evaluation would hold tasks and grading criteria constant across pinned models and retain the failed runs.

## What it demonstrates

- Provider choice can stay behind a small, explicit interface.
- Tool access and reasoning loops should be bounded before a model can act.
- Credential-free tests can exercise routing, grounding, tool use, and failure handling.
- Observability can remain useful without collecting model content by default.
- CI can audit the exact locked runtime dependency set instead of an approximate environment.

## Related writing

[The Hard Part of Agentic AI Starts After the Demo](/writing/agentic-ai-after-the-demo/) places this reference inside a wider production architecture. [How I Review AI-Built Public Work Without Outsourcing Judgment](/writing/reviewing-ai-built-public-work/) explains the claim, evidence, attribution, and release standard applied across the repository and this case study.
