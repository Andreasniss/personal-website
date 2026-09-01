---
title: "7DayFocus AI Delivery Lab"
description: "A completed AI-delivery learning lab: a local-first weekly planner with bounded model proposals, deterministic evaluations, human approval, and an honest product-discovery conclusion."
role: "Creator and repository owner"
year: 2026
weight: 20
featured: true
statusLabel: "Completed learning lab"
tags:
  - Claude
  - OpenAI
  - evaluations
  - human approval
socialImage: "/images/social/7dayfocus.png"
socialImageAlt: "7DayFocus AI Delivery Lab, a public AI-assisted delivery reference by Andreas Nissen."
repoURL: "https://github.com/Andreasniss/7dayfocus-ai-delivery-lab"
relatedArticleURL: "/writing/ai-native-software-delivery-methods/"
relatedArticleTitle: "Three AI-Native Software Delivery Methods Compared"
evidenceReady: true
lastVerified: "2026-09-01"
proofStats:
  - value: "248"
    label: "automated tests"
    url: "https://github.com/Andreasniss/7dayfocus-ai-delivery-lab/tree/main/src/test"
  - value: "24"
    label: "proposal eval cases"
    url: "https://github.com/Andreasniss/7dayfocus-ai-delivery-lab/blob/main/evals/README.md"
  - value: "3"
    label: "provider adapters"
    url: "https://github.com/Andreasniss/7dayfocus-ai-delivery-lab/blob/main/server/providers.mjs"
  - value: "0"
    label: "credentials for fixture path"
    url: "https://github.com/Andreasniss/7dayfocus-ai-delivery-lab/blob/main/src/ai/fixture.ts"
reviewerPath:
  - title: "Clone the locked project"
    action: "Run git clone, nvm use, and npm ci."
    expected: "The committed lockfile installs the reviewed Node dependency graph."
  - title: "Run the full gate"
    action: "Run npm run verify."
    expected: "Lint, type checking, 248 automated tests, 24 named proposal cases, and the production build pass."
  - title: "Launch the local demo"
    action: "Run npm run dev and open the Vite URL."
    expected: "The planner and loopback gateway start locally; the fixture path needs no provider account."
  - title: "Inspect the approval boundary"
    action: "Add two fictional tasks, open Plan my week, keep Fixture demo, and generate a proposal."
    expected: "Generation changes nothing. A complete diff appears, and one atomic change applies only after Approve all changes."
  - title: "Reset the reviewer state"
    action: "Remove the fictional tasks or clear this site's browser storage."
    expected: "The local planner returns to an empty state without a server-side account or retained credential."
reviewerFallback: "If you cannot run Node locally, inspect the proposal parser, deterministic fixture, eval suite, and P05 publication record. They expose the same bounded proposal and human-approval contract without presenting mocked adapters as live-provider evidence."
reviewerFallbackURL: "https://github.com/Andreasniss/7dayfocus-ai-delivery-lab/tree/main/docs/ai-dlc/changes/P05-publication"
architectureImage: "/images/projects/7dayfocus-ai-delivery-architecture.svg"
architectureAlt: "7DayFocus architecture showing Anthropic-inspired delivery artifacts above a local runtime where web provider proposals or an Android fixture pass through review, validation, explicit approval, and an atomic domain reducer."
architectureCaption: "The delivery lane preserves intent, specification, plan, implementation, review, and evidence. The runtime lane keeps model output outside the state boundary until deterministic validation and explicit human approval succeed. The Android shell is fixture-only."
evidenceRows:
  - claim: "The Anthropic-inspired handoff is inspectable"
    implementation: "Accepted intent, specification, plan, code, tests, review findings, and evidence remain versioned beside the implementation"
    url: "https://github.com/Andreasniss/7dayfocus-ai-delivery-lab/tree/main/docs/ai-dlc"
    linkLabel: "Inspect the artifact chain"
  - claim: "Model output cannot mutate the planner directly"
    implementation: "A strict proposal parser, deterministic final-state simulation, visible diff, stale-state check, and one atomic reducer action"
    url: "https://github.com/Andreasniss/7dayfocus-ai-delivery-lab/blob/main/src/domain/planProposal.ts"
    linkLabel: "Inspect the proposal boundary"
  - claim: "The public path is credential-free"
    implementation: "A deterministic fixture exercises proposal generation, review, approval, and application without a provider request"
    url: "https://github.com/Andreasniss/7dayfocus-ai-delivery-lab/blob/main/src/ai/fixture.ts"
    linkLabel: "Read the fixture"
  - claim: "Provider access remains bounded"
    implementation: "A loopback-only gateway maps a closed provider enum to fixed HTTPS destinations and never persists keys"
    url: "https://github.com/Andreasniss/7dayfocus-ai-delivery-lab/blob/main/docs/THREAT-MODEL.md"
    linkLabel: "Review the threat model"
  - claim: "Evaluation claims remain separated"
    implementation: "Named deterministic cases verify the application contract while live-provider quality remains explicitly unverified"
    url: "https://github.com/Andreasniss/7dayfocus-ai-delivery-lab/blob/main/evals/README.md"
    linkLabel: "Review the eval boundary"
  - claim: "The Android path fails closed"
    implementation: "The Tauri shell detects packaged mode and exposes only the deterministic fixture, without the loopback gateway or provider-key input"
    url: "https://github.com/Andreasniss/7dayfocus-ai-delivery-lab/tree/main/docs/ai-dlc/changes/P11-android-personal-install"
    linkLabel: "Inspect the Android packet"
limitations:
  - "The 24 proposal cases and mocked provider adapters verify deterministic application contracts, not live-model quality."
  - "Provider keys, billing, model availability, retention, and live responses remain user and provider responsibilities."
  - "Planner data is plaintext in browser localStorage, intended only for fictional non-sensitive data, and concurrent tabs remain last-write-wins."
  - "The loopback gateway is a local reference boundary, not a hardened public or multi-tenant service."
  - "The lifecycle adapts selected Anthropic guidance. It is not an Anthropic standard, certification, endorsement, or compliance claim."
  - "A current fixture-only Tauri Android source path and PC runbook are prepared, but an APK build, physical-device installation, and Google Play availability are not yet claimed."
  - "The standalone product is no longer an active goal because agent-to-Todoist connectors now solve the personal workflow more directly."
---

## The problem

An AI planner should not silently rewrite a person's week. Model output can be malformed, stale, or incompatible with real scheduling limits, and an API key should not become application data.

## What I built

7DayFocus is a local-first weekly planner with a proposal-only AI assistant. A user can select Anthropic, OpenAI, or OpenRouter, supply a key for one request, and ask the model to rebalance existing tasks. The assistant cannot create, rewrite, delete, complete, or automatically apply tasks.

Every model response passes through a strict proposal contract and the planner's deterministic capacity and priority rules. The interface shows the complete diff and reason for each change. Nothing mutates until the user explicitly approves the proposal, and the entire proposal is rejected if the week changed after generation.

The provider key is held only for the active request, sent through a loopback-only gateway to a fixed provider destination, and then cleared from the interface. It is not stored in browser persistence, exported with planner data, logged, or committed.

## The product-discovery result

I originally built 7DayFocus to solve a specific personal problem: stay focused on one week without accumulating another endless backlog. It was also a deliberate learning project for cross-platform development, AI-assisted delivery, model integration, evaluation, and human approval.

An earlier React and Tauri v2 version reached Android Studio and emulator testing and was prepared for distribution. I stopped before the final production launch. The main purpose was learning, not building a commercial task-management product.

The environment then changed. In my current personal workflow, Claude and ChatGPT act as the context-rich orchestration layer. Todoist provides the task database and visual interface through its connector and CLI. This is more useful than a separate AI-powered planner: the agent can work with broader context, while Todoist already handles persistence and everyday interaction.

That conclusion is part of the project evidence. AI-native product work is not only about shipping more features. It also means recognizing when platform capabilities remove the original need and stopping deliberately. The standalone app is now a completed learning lab, not an active product roadmap.

I have now prepared a current fixture-only Tauri v2 source path and PC continuation runbook for installing the lab on my own phone as a personal completion exercise. The Android package deliberately omits live-provider access because the local Node gateway is not embedded in the app. The APK build and physical-device test remain open evidence gates. Any later Google Play attempt is optional and capped at three hours. If Google's testing, identity, policy, or engineering gates require more effort, I will stop and retain the documented proof of concept.

## How the Anthropic method works here

Anthropic's [AI-native SDLC playbook](https://claude.com/blog/the-ai-native-sdlc-playbook) uses committed artifacts to preserve continuity between Plan, Design, Build, Test, Deploy, and Maintain. An accepted `intent.md` leads to `spec.md`, an approved specification leads to `plan.md`, and implementation produces the diff, tests, pull-request findings, and evidence that a reviewer can inspect. Humans remain accountable for judgment and approval.

This repository adapts that artifact handshake with one folder per change, a provider-neutral `AGENTS.md`, explicit review severities, and a concise evidence ledger. Those are project choices, not Anthropic requirements. The [P05 publication packet](https://github.com/Andreasniss/7dayfocus-ai-delivery-lab/tree/main/docs/ai-dlc/changes/P05-publication) records the final release boundary.

For larger enterprise delivery, AWS offers a more comprehensive [AI-Driven Development Life Cycle](https://aws.amazon.com/blogs/devops/ai-driven-development-life-cycle/) and open-source [AI-DLC Workflows](https://awslabs.github.io/aidlc-workflows/guide/00-introduction/). AWS adds Inception, Construction, and Operations phases, Units and Bolts, adaptive workflow depth, explicit state, and broader governance. The methods are related and can be layered without treating them as identical.

## What it demonstrates

- One provider-neutral proposal contract can sit above Anthropic Messages, OpenAI Responses, and OpenRouter Chat Completions.
- Structured model output still needs independent domain validation before it can change state.
- Human approval is a state boundary, not a sentence in a prompt.
- A deterministic fixture can make the full review and approval path inspectable without a provider account or key.
- Threat modeling, lifecycle artifacts, and evaluation cases can stay beside the implementation they govern.

## Evidence and current boundary

The current P11 candidate passes 248 automated tests, including 24 named proposal-evaluation cases, plus lint, type checking, a production build, and a zero-vulnerability runtime dependency audit. Provider-adapter tests use mocked responses; no real credential was used and live-provider behavior is not claimed. The Android source and capability boundary are reviewable, but the APK and physical-device behavior remain unverified until the PC continuation step runs.

This is an independent reference project, not a production service and not affiliated with or endorsed by Anthropic, OpenAI, OpenRouter, AWS, Todoist, or my employer.

The final product decision is intentional: preserve the working proof, artifact chain, tests, and lessons; use the stronger agent-plus-Todoist architecture in daily life; and resume standalone development only if a new learning goal justifies it.
