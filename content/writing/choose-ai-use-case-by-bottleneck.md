---
title: "How to Choose an Enterprise AI Use Case by Its Workflow Bottleneck"
date: 2026-09-05
lastmod: 2026-09-05
description: "A synthetic request-processing example compares faster extraction, shorter waits, and human exception workload before deciding what to automate."
primaryTopic: "Operating practice"
evidenceLabel: "Architecture analysis"
evidenceBoundary: "All workflow timings, volumes, and exception rates are synthetic assumptions used for transparent arithmetic. They are not customer observations, benchmark results, or an ROI forecast."
lastVerified: 2026-09-05
keyPoints:
  - "Separate active work from waiting before choosing an AI intervention."
  - "Include exception handling and verification in the human workload calculation."
  - "Evaluate correctly completed outcomes across the whole workflow, including difficult cases."
proofLinks:
  - label: "Andrew Ng on shifting team bottlenecks"
    url: "https://www.linkedin.com/posts/andrewyng_meta-pivots-from-open-weights-big-pharma-activity-7454559322900123648-zdsF"
socialImage: "/images/social/choose-ai-use-case-by-bottleneck.png"
socialImageAlt: "How to Choose an Enterprise AI Use Case by Its Workflow Bottleneck, an article by Andreas Nissen."
tags:
  - enterprise AI
  - workflow design
  - business outcomes
origin: "website"
featured: false
draft: false
---

A team proposes an AI assistant that reads incoming requests in two minutes. A person currently needs ten. The demo is fast. The queue has not noticed.

But each request also waits four hours before a reviewer opens it. If that wait stays the same, faster reading removes eight minutes from a process that takes four hours and forty minutes.

**Choose an AI use case by the outcome it can improve across the workflow, including waiting and human review.** Task speed is useful evidence only when it connects to the goal you are trying to achieve.

The numbers below are entirely synthetic. They illustrate a decision method, not results from an organization or a forecast of AI performance.

## Start with one complete request

Imagine an internal service-request process with four sequential stages. For the calculation, every request follows the same path and each timing is fixed. There is no parallel work or additional rework yet.

| Stage | Active work | Waiting |
|---|---:|---:|
| Read request and extract details | 10 min | 0 min |
| Wait for assigned reviewer | 0 min | 240 min |
| Check details and decide | 20 min | 0 min |
| Record decision and notify requester | 10 min | 0 min |
| Total | 40 min | 240 min |

Elapsed time is 280 minutes. Reducing extraction from ten minutes to two changes the total to 272 minutes, a reduction of approximately 2.9%, assuming everything else remains fixed.

That may still be worthwhile. If the goal is to free staff time for other work, saving eight active minutes per request could matter. If the goal is a much faster answer for the requester, the larger opportunity appears to be the wait.

This distinction connects to Andrew Ng's [discussion of changing team bottlenecks](https://www.linkedin.com/posts/andrewyng_meta-pivots-from-open-weights-big-pharma-activity-7454559322900123648-zdsF). He describes how faster coding makes decisions and adjacent functions more consequential to delivery. My extension is to examine the entire enterprise workflow before selecting the task to automate.

## Investigate the wait before proposing AI

Suppose a second proposal could reduce the reviewer wait from 240 minutes to 120. Holding other stages fixed, elapsed time would become 160 minutes, a reduction of approximately 42.9%.

That is the size of the assumed improvement. Whether routing software, an AI agent, or another reviewer could deliver it remains untested.

Ask why requests wait. Perhaps ownership is unclear. Perhaps incomplete information forces the reviewer to chase the requester. Perhaps requests arrive faster than the team can process them. Each cause suggests a different intervention.

A clear assignment rule might solve an ownership problem. AI-assisted extraction might help with unstructured input. Neither automatically creates reviewer capacity. A scheduled review batch might even be an intentional tradeoff that the team wants to preserve.

For a real assessment, follow a representative sample from arrival to completion. Capture stage timestamps, handoffs, missing information, and rework. A single average cannot show whether most people wait briefly while a smaller group gets stuck for days.

## Count the work returned to humans

Now consider a separate workload calculation for the review stage. Assume 100 requests per day across a team, each currently requiring 20 minutes of review. That is 2,000 staff-minutes daily.

Suppose an AI-prepared request takes five minutes to verify, but an exception takes 30 minutes including diagnosis and correction. If 80 requests follow the easy path and 20 become exceptions, review work is:

80 × 5 + 20 × 30 = 1,000 staff-minutes per day.

Under those assumptions, review workload falls by 50%. Now change the assumptions: 60 easy requests at five minutes and 40 exceptions at 45 minutes produce 2,100 staff-minutes, a 5% increase over the baseline.

Both outcomes are arithmetic scenarios. Neither says what an actual model will achieve. They show why exception rate and handling time belong in the proposal alongside ordinary-case speed.

These totals are aggregate labor across the team. They do not determine elapsed time or staffing capacity without information about arrivals, scheduling, and available reviewers. Include operational support and maintenance when assessing the overall cost as well.

## Define the pilot around completed outcomes

Compare the intervention with today's process and a simpler alternative, at the same quality requirement. Include incomplete, ambiguous, and difficult requests.

Measure time from arrival to correct completion, including a high percentile that makes long waits visible. Track correctly completed requests per period, human minutes per request, exception frequency, and errors discovered after completion. Distinguish a model's draft being accepted from the requester's problem being resolved.

Specify the decision owner and what evidence would cause the team to expand, revise, or stop the pilot. The numerical scenarios help choose which assumptions to investigate; observed workflow results must support the actual decision.

The strongest proposal can answer a practical question: which constraint will this change relieve, and how will we know the benefit survived the rest of the process?
