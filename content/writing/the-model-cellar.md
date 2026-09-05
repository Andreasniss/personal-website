---
title: "The Model Cellar: A Wine Lover’s Guide to Reading AI Model Cards"
description: "Compare OpenAI and Anthropic models through capabilities, computer use, long-task reliability, and the cost of a finished result."
date: 2026-09-05
lastmod: 2026-09-05
tags: [AI, Models, Evaluation]
draft: false
featured: false
origin: "website"
primaryTopic: "Evaluation"
evidenceLabel: "Source-backed explainer"
evidenceBoundary: "Public documentation and provider-reported evaluations; no independent hands-on benchmark. Wine descriptions are editorial analogies."
lastVerified: 2026-09-05
keyPoints:
  - "Compare exact model versions and operating conditions."
  - "Evaluate task durability separately from context capacity."
  - "Measure total cost per accepted result, including repair effort."
socialImage: "/images/social/the-model-cellar.png"
socialImageAlt: "The Model Cellar, a wine lover’s guide to AI model cards, by Andreas Nissen."
---

I want a model list that reads a little more like a wine list: provenance, vintage, character, price, and something useful to pair it with.

I enjoy looking at a bottle’s vintage and wondering what it tells me. I bring the same curiosity to model releases. What changed? What does the premium buy? Will this one hold together through a complicated evening?

With AI, the evening might involve a browser, a codebase, and a spreadsheet that refuses to cooperate.

My view: choose models by the work they help you finish. The label starts the conversation. The result earns the repeat order.

This is a source-backed reading of public model documentation and system cards, checked on September 5, 2026. It is not a hands-on benchmark. The wine descriptions are my editorial analogy, not measured model personalities.

## First, read both sides of the label

A useful comparison needs several documents. The model page provides specifications and supported interfaces. Pricing documentation describes the bill. A system card explains evaluations, limitations, safeguards, and deployment decisions. The release announcement supplies context, with the producer naturally choosing which results to emphasize. [Anthropic’s system-card index](https://www.anthropic.com/system-cards) and [OpenAI’s GPT-5.6 system card](https://deploymentsafety.openai.com/gpt-5-6) are starting points.

Treat the launch chart like the tasting note supplied by the vineyard: useful evidence with an identifiable author. Read the conditions before making it your own verdict.

| Wine criterion | Model question | What I would record |
|---|---|---|
| Provenance | What exactly am I using? | Provider, model ID, deployment surface, tools |
| Vintage | Which release produced this result? | Version, evaluation date, knowledge cutoff |
| Structure | Can it handle the task’s complexity? | Reasoning setting, constraints satisfied, output quality |
| Balance | How much quality do I buy with time and money? | Accepted results, elapsed time, total cost |
| Finish | Does it remain coherent through a long task? | Lost requirements, recovery, unnecessary restarts |
| Cellaring potential | Can I build around this version? | Snapshot behavior, retirement policy, migration effort |
| Pairing | Where does it fit my work? | Actual tasks, tools, permissions, verification needs |

The metaphor has limits. Models do not mature in a cellar. A newer release can change behavior, and a stable older version can remain useful. Vintage is an identity to record, not a quality score.

## The bottles on this table

For precision, I use the documented names Claude Sonnet 5, Claude Opus 5, GPT-5.6 Sol, and GPT-6 Astra. “ChatGPT 5.6.0” mixes a product name with a model version; Sol is the specific comparison here. Fable 5.1 joins the table because it is the current Fable release. [OpenAI’s GPT-5.6 announcement](https://openai.com/index/gpt-5-6/) explains the Sol, Terra, and Luna tiers.

Prices below are USD per million tokens for standard direct API usage, using base or short-context rates. They are not subscription prices or a quotation for another cloud platform.

| Model | Input / output | My suggested tasting role |
|---|---:|---|
| Claude Sonnet 5 | $2 / $10 | An economical starting point for repeatable work |
| GPT-5.6 Sol | $4 / $20 | A general-purpose reference point for the OpenAI comparison |
| Claude Opus 5 | $5 / $25 | A candidate for complex coding and enterprise tasks |
| GPT-6 Astra | $10 / $50 | A candidate for demanding computer use and professional workflows |
| Claude Fable 5.1 | $10 / $50 | A candidate for demanding reasoning and long-running work |
| Claude Mythos 5.1 | Same published pricing as Fable 5.1 | A restricted-access configuration, outside an ordinary buying decision |

Sources: [OpenAI API pricing](https://developers.openai.com/api/docs/pricing), [Claude model overview](https://platform.claude.com/docs/en/models/overview), and [Fable 5.1 specifications](https://platform.claude.com/docs/en/models/fable-5-1/overview). Sol’s listed promotional pricing runs at least through November 21, 2026. Astra’s rollout is staged; a published price does not establish that an account already has access.

These roles are starting hypotheses for evaluation. They are not a league table. Sonnet’s lower sticker price is useful; it does not establish the lowest cost for every completed task. Equally, premium pricing does not prove a workload needs the premium model.

Anthropic describes Fable 5.1 and Mythos 5.1 as the same model with different safeguards. Fable is generally available; Mythos uses trusted access programs for specialized work. Calling both “gated models” would obscure an important distinction. [Fable and Mythos 5.1 announcement](https://www.anthropic.com/claude-fable-and-mythos-5-1).

The allocation list tells you who can obtain a bottle. It does not tell you what to serve with dinner.

## Capabilities: taste more than one note

Coding, research, visual interaction, and faithful document work are different tests. A model can lead on one and trail on another.

For one dated comparison, OpenAI’s Astra launch table reports the following results. These are provider-published results under the reported evaluation conditions, not my measurements or proof of universal superiority.

| Evaluation | GPT-5.6 Sol | Claude Opus 5 | Claude Fable 5.1 | GPT-6 Astra |
|---|---:|---:|---:|---:|
| Terminal-Bench 4.0 | 37.3% | 52.6% | 55.8% | 57.9% |
| DeepSWE v1.1 | 72.7% | 73.7% | 67.4% | 74.1% |
| Humanity’s Last Exam, with tools | Not reported | 63.6% | 65.0% | 57.2% |

[Source and evaluation footnotes](https://openai.com/index/gpt-6-astra/). Sonnet 5 is absent from this particular comparison; an empty seat is not a zero score.

The practical lesson is the changing order. Before importing any number into a purchasing decision, record the task version, reasoning budget, tool access, retry policy, and scoring method. Small gaps need uncertainty estimates before they deserve strong conclusions.

The agent harness matters too: it supplies the tools, context management, execution loop, and constraints around the model. Comparing two products often compares that entire arrangement. To isolate model differences, keep the surrounding setup as consistent as the interfaces permit. To choose a product, test the complete product you will actually use.

I would rather have five representative tasks than five adjectives describing intelligence.

## Computer use: can it serve the table?

Computer use adds a practical question: can the system operate the software where the work lives? Understanding a screenshot, choosing the right action, recovering from a changed screen, and verifying the final state all matter.

OpenAI reports Astra at 72.6% versus Sol at 65.7% on OSWorld 2.0, with approximately 40 versus 75 minutes per task in latency simulations. The simulation qualifier belongs beside the numbers. These are not measured timings on my laptop. [Astra release evaluation](https://openai.com/index/gpt-6-astra/).

Anthropic’s July Opus 5 announcement reports strong OSWorld 2.0 cost-performance relative to its comparison set at release. That is useful historical evidence, not a claim that July’s ordering still holds after September’s releases. [Opus 5 announcement](https://www.anthropic.com/news/claude-opus-5).

My practical test would be mundane: update a spreadsheet, cope with an unexpected dialog, preserve formulas, and show that the saved file is correct. I would separately test whether the agent pauses before an unauthorized external action.

Clicking confidently is a capability. Finishing correctly is the outcome.

## Durability: the second glass matters

I use durability in two senses.

**Task durability** means keeping the objective and constraints intact as work stretches across tools, interruptions, and context boundaries. Large context capacity alone cannot establish that. A generous wine glass does not guarantee a good finish.

One relevant development is OpenAI’s experimental Codex support for Astra to retain notes and search earlier context windows. That is a model-and-product workflow feature; I would not assume every API integration inherits it. [Astra’s context-management description](https://openai.com/index/gpt-6-astra/).

**Operational durability** means being able to reproduce a setup and plan its replacement. Anthropic documents pinned model IDs and earliest retirement dates. Its overview lists Sonnet 5 as not retiring before June 30, 2027 and Opus 5 before July 24, 2027. Fable 5.1’s page lists September 1, 2027. Those are earliest retirement boundaries, not scheduled shutdown dates. [Claude overview](https://platform.claude.com/docs/en/models/overview), [Fable lifecycle](https://platform.claude.com/docs/en/models/fable-5-1/overview).

For my own workflows, I would save the exact model ID, prompt, effort setting, tool versions, and a few regression tasks. A familiar label is insufficient evidence that the whole service behaves identically over time.

## Price: ask for the whole bill

Here is an illustrative calculation, not a workload benchmark. Assume 100,000 uncached input tokens and 10,000 billed output tokens, with no cache writes, tool charges, retries, or long-context premium.

| Model | Calculated token cost |
|---|---:|
| Sonnet 5 | $0.30 |
| Sol | $0.60 |
| Opus 5 | $0.75 |
| Astra | $1.50 |
| Fable 5.1 | $1.50 |

Calculation: input rate × 0.1 + output rate × 0.01, using the cited price table above. Equal token counts are an accounting illustration; different models can tokenize the same material differently and generate different amounts of reasoning and output.

Caching can change the order. Fable 5.1 lists cache reads at $0.25 per million tokens, while Astra lists $1 at short context. Re-reading one million already-cached tokens therefore costs $0.25 versus $1 before other charges. Cache creation, eligibility, lifetime, output, and actual usage still matter. [Fable pricing detail](https://platform.claude.com/docs/en/models/fable-5-1/overview), [OpenAI pricing](https://developers.openai.com/api/docs/pricing).

Sol also prices requests above 272,000 input tokens at twice the input rate and 1.5 times the output rate for the full request. A short-context table cannot price that workload. [Sol model documentation](https://developers.openai.com/api/docs/models/gpt-5.6-sol).

My preferred measure is total spend divided by accepted tasks, with human review time recorded separately. Otherwise a cheap answer that takes twenty minutes to repair receives an undeserved discount.

## Read the sediment: limitations and safeguards

The revealing part of a system card is often where the producer describes a limitation.

OpenAI reports reduced monitorability of Astra’s written reasoning relative to Sol in its evaluations. Anthropic documents Fable and Mythos as differing in safeguards and access. These facts address different questions; they should not be compressed into a single homemade “safety score.” [Astra system card](https://deploymentsafety.openai.com/gpt-6-astra/model-safety-training-and-evaluation), [Fable/Mythos release](https://www.anthropic.com/claude-fable-and-mythos-5-1).

My engineering conclusion is to verify observable actions and results, and to make permissions explicit. A persuasive explanation cannot replace checking the file, query, or transaction. This applies across providers.

## My small cellar manifesto

Read the label. Record the vintage. Choose the pairing. Check the bill.

For a first tasting, use five real tasks: a sourced answer, a checked code change, a spreadsheet edit, an interrupted long task, and a permission boundary. Repeat to expose inconsistency. Record correctness, interventions, time, cost, and whether reported success matches the result.

Hide the model names where feasible. Keep the rubric visible.

I enjoy the releases, the specifications, and the occasional extravagant tasting note. My allegiance is to the work that comes out of the bottle.

*This article reflects my personal opinions, based on public information. It is a private, independent piece and does not represent Amazon Web Services or any other employer. It is not affiliated with or endorsed by AWS, OpenAI, or Anthropic. AI tools assisted with research and drafting; the editorial perspective is my own.*
