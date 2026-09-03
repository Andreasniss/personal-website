---
title: "Three AI-Native Software Delivery Methods Compared"
date: 2026-08-31
description: "AI-native delivery solves three different problems: preserving intent, governing complex delivery, and giving coding agents a reliable execution environment."
primaryTopic: "Operating practice"
evidenceLabel: "Tested project analysis"
evidenceBoundary: "The comparison uses public guidance and one small repository adaptation. It does not reproduce Anthropic's internal process, implement the complete AWS lifecycle, or validate OpenAI's reported results."
lastVerified: 2026-08-31
keyPoints:
  - "Choose a method by the failure you need to prevent, not by the vendor name."
  - "Artifact handoffs preserve intent; lifecycle governance manages complexity."
  - "Harness engineering makes agent execution reliable inside the repository."
proofLinks:
  - label: "Inspect the 7DayFocus implementation"
    url: "https://github.com/Andreasniss/7dayfocus-ai-delivery-lab"
  - label: "Read Anthropic's AI-native SDLC playbook"
    url: "https://claude.com/blog/the-ai-native-sdlc-playbook"
  - label: "Read the AWS AI-DLC guide"
    url: "https://awslabs.github.io/aidlc-workflows/guide/00-introduction/"
socialImage: "/images/social/ai-native-delivery-methods.png"
socialImageAlt: "Three AI-Native Software Delivery Methods Compared, an article by Andreas Nissen."
tags:
  - AI-DLC
  - software delivery
  - coding agents
origin: "website"
featured: true
draft: false
image: "/images/articles/ai-native-delivery-methods.svg"
imageAlt: "Comparison of Anthropic artifact handoffs, AWS lifecycle governance, and OpenAI harness engineering."
relatedProjectURL: "/projects/7dayfocus-ai-delivery-lab/"
relatedProjectTitle: "7DayFocus AI Delivery Lab"
---

“AI-native software delivery” hides three different engineering problems: preserving intent across handoffs, governing delivery across teams, and giving coding agents a reliable execution environment.

Anthropic, AWS, and OpenAI each emphasize one of those layers.

The useful decision is not which vendor method wins. It is which failure you need to prevent:

- Lost intent across people or agent sessions: use durable artifact handoffs.
- Unmanaged complexity across components and controls: use lifecycle governance and decomposition.
- Unreliable execution inside the repository: engineer the agent harness.

Most serious projects need a small combination, not the full weight of all three.

## Anthropic: make every handoff an artifact

Anthropic's [AI-native SDLC playbook](https://claude.com/blog/the-ai-native-sdlc-playbook) keeps six recognizable responsibilities: Plan, Design, Build, Test, Deploy, and Maintain. The main change is how work moves between them.

Each stage writes an artifact that the next stage can read. An idea becomes `intent.md`. The accepted intent becomes `spec.md`. The approved specification becomes `plan.md`. Implementation produces code and tests. The pull request preserves review findings. A production incident can become a new intent and start the loop again.

This creates a shared interface between people and agents. The product owner can correct the intent. An engineer can challenge the plan before code changes. A reviewer can compare the final diff with the accepted specification. Git records who changed and approved each artifact.

The method is deliberately modular. Teams can adopt individual plays and keep humans focused on the gates that require judgment. Anthropic's [security guidance for its AI-native SDLC](https://claude.com/blog/how-anthropic-secures-its-ai-native-software-development-lifecycle) adds an important qualification: higher velocity requires risk-tiered automation, hard identity and access boundaries, deterministic and agentic review, logged approvals, and human review for critical code.

The strength of this approach is continuity. It gives an agent enough durable state to continue the work without relying on one long chat. Its risk is ceremony. A small reversible change does not need four documents. The artifact chain earns its cost when ambiguity, duration, coordination, or consequence makes handoff quality important.

## AWS: govern the complete delivery lifecycle

AWS's [AI-Driven Development Life Cycle](https://aws.amazon.com/blogs/devops/ai-driven-development-life-cycle/) addresses a larger problem. It is a structured method for moving from customer intent through implementation and operation with AI participating across the lifecycle.

The open-source [AI-DLC Workflows](https://awslabs.github.io/aidlc-workflows/guide/00-introduction/) organize work across Inception, Construction, and Operations. The [phase and stage model](https://awslabs.github.io/aidlc-workflows/guide/04-phases-and-stages/) covers discovery, requirements, design, implementation, testing, deployment, and operational learning.

Two concepts make the method especially useful for complex work:

1. A **Unit** is an independently implementable component or service.
2. A **Bolt** is one Construction pass for a Unit or a small dependency-linked group.

The first Bolt should create a walking skeleton that exercises the architecture end to end. Later Bolts can follow dependency, value, risk, and learning priorities. AWS also makes [scope and workflow depth](https://awslabs.github.io/aidlc-workflows/guide/05-scopes-and-depth/) explicit, so a focused change does not automatically inherit the same process as a large system.

This is stronger than a file naming convention. It provides lifecycle governance, decomposition, traceability, and evidence for environments where several teams, services, controls, or approval owners are involved.

The tradeoff is weight. A full enterprise method can slow down work when the real need is one bounded repository change. The method should scale with consequence and irreversibility, not with project prestige.

## OpenAI: engineer the harness around the agent

OpenAI's [harness engineering](https://openai.com/index/harness-engineering/) starts from another observation: an agent is only as effective as the environment in which it works.

Repository knowledge must be discoverable. Tests, linters, type checkers, and build commands must provide fast feedback. Work should be isolated and reviewable. Repeated review feedback should become durable instructions or deterministic checks. The harness gives the model context, tools, observable results, and a clear definition of done.

OpenAI's guidance for [long-horizon Codex tasks](https://developers.openai.com/blog/run-long-horizon-tasks-with-codex) makes the operating loop concrete: plan, edit, run tools, observe, repair, update status, and repeat. Durable project memory keeps the work coherent through a specification, milestone plan, execution instructions, and a current status record.

The [custom code review rules](https://developers.openai.com/blog/custom-code-review-rules-for-codex) show how the harness learns. Consequential repository-specific invariants belong in scoped `AGENTS.md` rules. Mechanical checks remain in CI. A rule should include both the risk and the safe path, and it should be tested against violations, valid exceptions, and unrelated changes.

Harness engineering is less a lifecycle methodology than an execution foundation. It explains why the same model performs differently across repositories. A vague codebase with slow tests and hidden conventions will produce weaker agent work than a repository with clear boundaries and immediate feedback.

## How the methods fit together

| Method | Primary layer | Best fit | Main risk |
| --- | --- | --- | --- |
| Anthropic AI-native SDLC | Artifact handoffs between stages | One product or repository that needs durable continuity and reviewable approval | Creating documents that do not improve a decision |
| AWS AI-DLC | Lifecycle governance and decomposition | Complex enterprise delivery with multiple components, controls, or teams | Applying the full method to small reversible work |
| OpenAI harness engineering | Agent execution environment and feedback loops | Any repository where coding agents must operate reliably over time | Treating instructions as enforcement instead of adding tests and boundaries |

I would combine them in three layers:

1. Use AWS to decide the delivery depth, decomposition, and governance that the outcome requires.
2. Use Anthropic's artifact handshake where intent, specification, plan, and evidence must survive across people or agent sessions.
3. Use harness engineering to make the repository executable: clear instructions, bounded tools, fast verification, observable failures, and feedback encoded close to the code.

Then define authority once. Deterministic controls should enforce stable invariants. Agents should handle reviewable exploration and implementation. Humans should retain product judgment, material risk acceptance, and irreversible release decisions.

## A small working example

I used the lighter artifact pattern in the [7DayFocus AI Delivery Lab](/projects/7dayfocus-ai-delivery-lab/). Each material change keeps accepted intent, specification, plan, implementation, tests, review findings, and evidence beside the code.

The runtime demonstrates the same principle at a different boundary. A model may propose task moves and priority changes. The application parses and validates the complete proposal, shows the exact diff, checks that state has not changed, and applies one atomic transition only after explicit approval.

The repository does not claim to implement Anthropic's internal process or the full AWS AI-DLC. It makes one useful pattern inspectable: agents can move quickly when intent and evidence are durable, deterministic boundaries remain outside the model, and humans approve the decisions that matter.
