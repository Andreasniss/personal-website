---
title: "8 Rules for Running an AI Agent Skill Library"
date: 2026-06-01
description: "What seven months of operating roughly 100 agent skills taught me about maintenance, routing, structure, and trust."
primaryTopic: "Operating practice"
evidenceLabel: "Operating experience"
evidenceBoundary: "These rules come from sustained personal operation of an approximately 100-skill library. They are not the result of a controlled comparison across agent harnesses."
lastVerified: 2026-09-05
keyPoints:
  - "A skill library is an operated system, not a collection of instruction files."
  - "Routing descriptions, freshness, and source trust determine reliability."
  - "Retire obsolete model workarounds while preserving required permissions and safeguards."
proofLinks:
  - label: "View the original LinkedIn carousel"
    url: "https://www.linkedin.com/feed/update/urn:li:activity:7467132017814433793/"
tags:
  - AI agents
  - agent skills
  - AI engineering
  - developer tools
origin: "linkedin"
linkedinURL: "https://www.linkedin.com/feed/update/urn:li:activity:7467132017814433793/"
featured: false
draft: false
skillCards: true
image: "/images/articles/agent-skill-library.svg"
imageAlt: "Eight operating rules for an AI agent skill library, arranged as a compact card system."
editorialImage: "/images/editorial/eight-rules-ai-agent-skill-library-v1.webp"
editorialAlt: "An orderly card catalogue contains an avalanche of loose instructions."
socialImage: "/images/social/eight-rules-ai-agent-skill-library-editorial-v1.png"
socialImageAlt: "An orderly card catalogue contains an avalanche of loose instructions."
series: "Operating Agent Systems"
seriesOrder: 1
lastmod: 2026-09-05
---

Building an agent skill is cheap. Importing one is even cheaper.

Soon you have a folder full of instructions and a small constitutional crisis over who owns the task. Which skill should trigger? Where do they overlap? What can each execute?

When I first published these rules, I had spent seven months running roughly 100 skills across multiple agent harnesses. The useful shift was to give each workflow an owner, an activation boundary, and evidence that it still worked. The count describes that period, not the current size of my library.

These eight rules survived across the coding, productivity, and personal agents in my setup.

> ## 01 · Maintenance is the product
>
> A skill can become stale even when its file has not changed. Review the tools, references, and permissions it depends on. File age is a triage signal: an old stable workflow may need less attention than a recently edited integration whose API changed yesterday.
>
> Model upgrades deserve the same attention. [Clare Liguori describes revisiting steering instructions as models improve](https://www.youtube.com/watch?v=pqlWNihgdjI&t=506s): a workaround for yesterday's model can become unnecessary context for today's. A skill library should not become a museum of bugs the model no longer has.
>
> My proposed retirement rule: record which failure an instruction addresses, compare representative cases with and without it on the new model, and remove it only when the relevant behavior holds. Keep the failing case for future checks. One successful response is weak evidence for an intermittent problem.
>
> For example, a repeated formatting reminder might become redundant. A requirement to obtain approval before sending a message remains an authority boundary, even when the model usually asks correctly. Better behavior is not permission to remove the rule or its enforcement. This is a suggested maintenance method, not a reported result from my library.
>
> **Try this**
>
> `Identify instructions tied to older model failures. Propose a bounded comparison for one candidate, preserving permissions, security boundaries, and required checks. Recommend retirement only when the evidence supports it.`

> ## 02 · Automate with hooks
>
> Do not depend on the agent remembering every supporting step. Hooks can react to events such as a saved file or a tool call, then trigger validation, logging, or another bounded action automatically.
>
> Check what the hook actually guarantees. Does it block execution or only report it? Does every relevant entry point invoke it? If it fails, does the protected action stop? A hook is useful only within the paths and failure behavior the harness supports.
>
> **Try this**
>
> `Add a hook that runs my skill's validation script automatically whenever a matching file is saved.`

> ## 03 · The description is the router
>
> In a system that selects skills before loading their instructions, the name and short description form the first routing interface. A vague description can select the wrong workflow before its detailed safeguards are even read.
>
> Specific beats long. State when to use the skill, the signals that should trigger it, and the nearby cases it should not own.
>
> **Try this**
>
> `Test each description with an in-scope request, a similar out-of-scope request, and a request that overlaps another skill. Revise the boundary where routing fails.`

> ## 04 · One source of truth
>
> The same fact copied into ten skills becomes ten things to update. Constants, policies, shared terminology, and reusable instructions should each have one owner. Other skills should reference that source instead of carrying silent copies.
>
> This is less convenient when you create the first file. It is much safer when the tenth file changes.
>
> **Try this**
>
> `Find facts repeated across skills. Move each to one file and replace the copies with a citation.`

> ## 05 · Use progressive disclosure
>
> Do not load every detail into the agent's context up front. Let it see the compact description first, load the main workflow when selected, and retrieve deeper references only when the task requires them.
>
> This keeps the initial context smaller and makes the skill easier to navigate. It also forces a useful distinction between the core operating procedure and supporting detail.
>
> **Try this**
>
> `Identify details that are rarely needed and can move to linked references. Keep mandatory scope, permission, and failure rules in the main workflow.`

> ## 06 · When in doubt, cut
>
> Near-duplicates make ownership ambiguous. Compare routes before and after consolidation; fewer files alone do not establish a better system.
>
> Merge shared responsibilities when that clarifies ownership. Check references and scheduled dependencies before archiving an unused skill.
>
> **Try this**
>
> `Show skills with overlapping triggers or duplicate purpose. Recommend which to merge or delete.`

> ## 07 · Collecting is not building
>
> Starring a repository or copying a popular instruction file can feel like progress. It is only useful when the imported material is integrated into your system.
>
> A skill you never adapt may overlap with existing instructions, contradict local rules, or remain invisible because its routing description does not fit your environment. The work is not the import. The work is reconciliation.
>
> **Try this**
>
> `List skills whose instructions overlap or contradict each other. Show the conflicts so I can reconcile them into one system.`

> ## 08 · Trust the source
>
> A skill is not merely text. It contains instructions and may include scripts, network calls, or access to secrets and local files. Importing one is a supply-chain decision.
>
> Prefer sources you can verify. Inspect what the skill executes, which permissions it assumes, and what data it can reach before allowing it into an agent environment.
>
> **Try this**
>
> `Review the source revision, executable code, network destinations, dependencies, and requested permissions. Test with synthetic data and minimal access before adoption.`

## The operating model

Judge the library by whether the right workflow runs with current instructions and appropriate authority. File count is a poor substitute.

Start with one failure: the wrong skill loaded, a reference was missing, or a requested draft triggered a sending workflow. Reproduce it, repair the responsible boundary, and keep the case as a regression check. The [routing companion](/writing/skill-routing-is-reliability/) shows how to evaluate those decisions without rewarding unnecessary activation.

The original [13-card LinkedIn carousel](https://www.linkedin.com/feed/update/urn:li:activity:7467132017814433793/) contains the compact version of these rules. This article is the durable, expanded version.
