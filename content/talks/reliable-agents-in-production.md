---
title: "Reliable Agents in Production"
description: "A workshop format for moving from an impressive agent demo to an operable system with explicit evidence and controls."
draft: false
format: "Workshop"
weight: 10
socialImage: "/images/social/reliable-agents-workshop.png"
socialImageAlt: "Reliable Agents in Production workshop by Andreas Nissen."
tags:
  - agent reliability
  - evaluation
  - architecture
lastmod: 2026-09-05
---

## The question

What has to change between a useful agent prototype and a system an enterprise can operate with confidence?

## Audience

Solutions architects, engineering leaders, platform teams, security teams, and technical executives evaluating production agent systems.

## Verified delivery

I helped run an Amazon Bedrock AgentCore Immersion Day for more than 100 participants. As a distinct part of that program, I designed and delivered a custom evaluation and policy module extension for a cohort of about 30 participants.

The evaluation and policy extension is the material I personally built and taught. The discussion path below summarizes the public architecture themes; it is not a claim to have authored the complete Immersion Day.

## Discussion path

1. Define the agent's outcome, authority, and failure boundary.
2. Separate context, reasoning, control, and execution.
3. Turn broad capabilities into narrow tool contracts.
4. Design evaluation across answer quality, plans, policies, and actions.
5. Add observable evidence for model calls, tools, approvals, and outcomes.
6. Walk through failure modes and the operating response.

## Participant outcome

The intended takeaway is a review method participants can apply to their own agent: define one outcome, identify the permitted actions, select a failure case, and specify the evidence required before allowing a consequential effect. No measured learning improvement is claimed.

## Public artifacts

The original event materials are not published here. These related public artifacts let readers examine the architecture themes independently; they are not the original slides or a recording:

- [The Hard Part of Agentic AI Starts After the Demo](/writing/agentic-ai-after-the-demo/)
- [Agent Reliability Lab](/projects/mistral-playground/)
- [Why Enterprise AI Agents Need Separate Context and Control Layers](/writing/context-and-control/)
