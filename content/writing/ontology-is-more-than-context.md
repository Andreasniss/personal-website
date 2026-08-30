---
title: "An Ontology Is More Than Context"
date: 2026-08-28
description: "Context is the evidence available now. An ontology defines what the entities, relationships, and rules in that evidence mean."
tags:
  - ontology
  - knowledge graphs
  - context engineering
featured: true
draft: false
---

Context is what an AI system can see for the current task.

An ontology defines what that information means.

The terms are related, and they are not interchangeable. A long prompt can contain plenty of context without a stable model of the domain. An ontology can describe the domain even when only a small part of it is retrieved for one request.

## Context is task-specific evidence

Context is assembled for a particular interaction. It can include instructions, documents, records, conversation state, retrieved passages, tool results, and user preferences.

The central question is relevance: which evidence will help the model answer or act correctly now?

Context is therefore dynamic. Two requests about the same customer may need different records. A support question may need current incidents and recent changes. A commercial question may need contracts, stakeholders, and renewal dates.

## An ontology is a shared model of the domain

An ontology defines the concepts that exist, the relationships between them, and often the constraints that make those relationships meaningful.

In an enterprise domain, it might define that:

- a customer owns accounts;
- an account contains workloads;
- a workload depends on services;
- an incident affects a workload;
- a change may cause or mitigate an incident;
- a person has a role that grants specific responsibilities.

This is more than a list of labels. The model establishes what can connect to what and how those connections should be interpreted.

## A knowledge graph instantiates the model

The ontology provides the vocabulary and structure. A knowledge graph stores concrete entities and relationships that follow it.

If the ontology says that a workload can depend on a service, the graph can state that `Checkout API` depends on `Payment Service`. If an incident affects the payment service, the relationship helps the system find the potentially impacted workload.

The graph is not automatically context. It becomes context when the application selects relevant subgraphs, facts, or summaries for the current task.

## Why the distinction matters for agents

Without a shared domain model, agents rely heavily on text similarity and local phrasing. They may retrieve a relevant paragraph and still miss the operational relationship that makes it important.

An ontology can improve:

- **retrieval:** search by relationships and entity types, not only matching words;
- **consistency:** use the same meaning for customer, account, workload, policy, and owner across systems;
- **tool selection:** map user intent to actions associated with known entity types;
- **validation:** reject relationships or actions that violate domain constraints;
- **explanation:** show the chain connecting evidence to a conclusion.

It does not eliminate ambiguity. Real organizations contain exceptions, incomplete records, and conflicting definitions. The ontology makes those disagreements visible instead of leaving them buried in prompts and application code.

## Ontology does not grant authority

A well-modeled relationship can tell an agent that a person owns an account or that a change affects a workload. It does not prove that the current user may modify either one.

Domain meaning and execution control remain separate. The ontology supports reasoning. Identity and policy determine permission. The action service enforces the boundary.

This separation prevents a common shortcut: treating access to knowledge as authority to act on it.

## A practical design sequence

Do not start by modeling the entire enterprise. Begin with one decision or workflow:

1. Name the questions the system must answer.
2. Identify the minimum entities and relationships required.
3. Define authoritative sources for each fact.
4. Represent the concrete relationships in a graph or structured model.
5. Retrieve only the relevant portion as runtime context.
6. Measure whether the model improves answers, actions, and explanations.
7. Expand the ontology only when another use case earns the complexity.

The useful unit is not the biggest graph. It is the smallest shared model that makes an important decision more reliable.

Context gives the agent evidence. An ontology gives that evidence structure and meaning. Control still decides what happens next.

