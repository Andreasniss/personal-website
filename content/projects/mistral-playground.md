---
title: "Mistral Playground"
description: "A Python learning lab for provider switching, tool-call loops, retries, observability, APIs, and local models."
role: "Creator and repository owner"
year: 2026
weight: 30
featured: true
statusLabel: "Open source"
tags:
  - Mistral
  - OpenTelemetry
  - Python
repoURL: "https://github.com/Andreasniss/Mistral-playground"
---

## The problem

A model API quickstart proves that a request can return text. It does not teach the operational patterns needed around the call: configuration, retries, tool execution, testing, tracing, structured output, or switching between hosted and local models.

## What I built

Mistral Playground is a modular Python lab with command-line demos, a Streamlit interface, a FastAPI surface, mocked tests, opt-in OpenTelemetry tracing, and support for both Mistral's API and local Ollama models.

The API wrapper centralizes model calls and implements bounded retry behavior for transient failures. Operational logs and traces record metadata by default, not prompt, response, or tool-result content.

## What it demonstrates

- Provider choice can stay behind a small, explicit interface.
- Retry behavior should distinguish transient failures from client errors.
- Tests can exercise tool loops and failure handling without making live model calls.
- Observability can be useful without collecting model content by default.

## Proof

- [Explore the public repository](https://github.com/Andreasniss/Mistral-playground)

