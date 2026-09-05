---
title: "What Evidence Should an AI-Generated Pull Request Carry?"
date: 2026-09-05
lastmod: 2026-09-05
description: "A practical design for binding tests, AI review, and human approval to the exact software change, with explicit rules for missing evidence and blocked releases."
primaryTopic: "Evaluation"
evidenceLabel: "Architecture analysis"
evidenceBoundary: "This is a proposed evidence record and release policy grounded in public attestation documentation. The scenarios are illustrative. No implementation, defect-detection benchmark, or reduction in review effort is claimed."
lastVerified: 2026-09-05
keyPoints:
  - "Bind checks and approvals to the exact revision and artifact they cover."
  - "Keep mandatory release conditions separate from an AI reviewer's confidence."
  - "Evaluate missed defects and false alarms before expanding reviewer autonomy."
proofLinks:
  - label: "Read Rafael Ramos's attestation proposal"
    url: "https://www.linkedin.com/pulse/attestation-model-continuous-integration-ai-native-sdlc-rafael-ramos-sviwf/"
  - label: "Inspect GitHub's attestation boundaries"
    url: "https://docs.github.com/en/actions/concepts/security/artifact-attestations"
  - label: "Read the SLSA scope"
    url: "https://slsa.dev/spec/v1.2/about"
editorialImage: "/images/editorial/evidence-for-ai-generated-pull-requests-v1.webp"
editorialAlt: "An approval seal belongs to an older parcel, while the revised parcel awaits inspection."
socialImage: "/images/social/evidence-for-ai-generated-pull-requests-editorial-v1.png"
socialImageAlt: "An approval seal belongs to an older parcel, while the revised parcel awaits inspection."
tags:
  - AI-assisted development
  - evaluation
  - software quality
origin: "website"
featured: false
draft: false
relatedArticleURL: "writing/reviewing-ai-built-public-work/"
relatedArticleTitle: "How I Review AI-Built Public Work Without Outsourcing Judgment"
---

An AI-generated pull request should carry enough evidence for a reviewer to answer three questions: what requirement does this change implement, what was actually checked, and does that evidence still apply to the version about to ship?

Consider a refund service. An agent changes the calculation, the tests pass, and a reviewer approves the pull request. Then another commit changes the authorization check. The original approval still appears in the conversation, beside a reassuring summary of the earlier tests.

The checks are green. For a different revision. Did anyone verify the authorization behavior in the code about to ship?

My proposed decision rule is simple: **a change can proceed only when its required evidence is complete, applies to the current candidate, and satisfies an explicit policy.** Model confidence can help direct review effort. It cannot waive those conditions.

## Build on the attestation idea

[Rafael Ramos's Attestation Model](https://www.linkedin.com/pulse/attestation-model-continuous-integration-ai-native-sdlc-rafael-ramos-sviwf/) proposes combining automated checks, AI verification, and human judgment into a structured record. It also recognizes that verification depends on specification quality and that agent confidence needs empirical calibration.

I would turn that into an evidence contract: what each producer records and what the consumer verifies before authorizing merge or deployment.

Existing attestation systems already address part of this problem. [GitHub artifact attestations](https://docs.github.com/en/actions/concepts/security/artifact-attestations) associate signed provenance with a build's workflow, repository, commit, and other identity information. GitHub explicitly warns that an attestation does not guarantee an artifact is secure and that consumers must verify attestations for them to provide a security benefit.

[SLSA](https://slsa.dev/spec/v1.2/about) similarly distinguishes supply-chain integrity from code quality. A trustworthy account of where a binary came from does not establish that its refund calculation is correct.

The design below adds review evidence and release policy around those boundaries. It is a proposal, not a new attestation standard or a tested pipeline.

## Start with the subject of the evidence

A pull request number identifies a discussion that changes over time. It is insufficient as the sole identity of the code being approved.

For merge review, I would record the repository, head commit, target-branch commit, and tested integration revision. For deployment, I would also identify the artifact by a cryptographic digest and link it to its verified build provenance. If the release process rebuilds the software, that new artifact needs its own applicable evidence.

The record should make these relationships inspectable:

| Record section | Minimum useful content |
|---|---|
| Candidate | Repository, head and base revisions, tested integration revision; artifact digest when available |
| Intent | Requirement and specification revisions, acceptance criteria, owner of material changes |
| Checks | Check identity, tool version, run identity, result, execution time, evidence reference |
| Coverage | Required checks, selected checks, omitted checks and reasons, unresolved gaps |
| AI review | Model and configuration identifiers, review-instruction revision, findings, supporting locations, uncertainties |
| Human decision | Reviewer identity, approved scope and revision, decision time, any permitted exception |
| Policy decision | Policy revision, risk class, blocking conditions, satisfied requirements, decision and reasons |

This is a field-level design. An implementation still needs a versioned schema, validation rules, authenticated producers, protected storage, and a consumer that rejects malformed or incomplete records.

Evidence references should resolve to access-controlled records with integrity protection. A link to an editable comment is weak evidence. Raw prompts, credentials, private source material, and internal reasoning traces should not be copied into a public record.

## Keep required checks outside the author's control

The coding agent can propose a test plan. It should not be able to silently redefine the release requirements for its own change.

The same applies to specifications. Giving a second model the same implementation-shaped specification does not establish independent acceptance criteria. I would keep requirement ownership explicit and require separate approval for material changes to the specification or verification policy.

In the refund example, a proposal that changes both the authorization code and its expected test result deserves particular attention. The reviewer needs to determine whether the business rule changed or the test was weakened to accept a defect.

Separate model and prompt choices can provide different review perspectives. They do not by themselves establish independent evidence. The useful boundary is who can change the requirement, the checks, and the release decision.

I would also keep the authority to sign and publish trusted evidence outside the untrusted code execution environment. A PR can contain executable tests and instructions aimed at the reviewer. Those inputs must not gain access to signing credentials, release permissions, or the policy that judges them.

## Use explicit gates before considering confidence

A failed authorization test must block the change regardless of how many routine checks pass.

I would implement the decision in this order:

1. Verify the evidence producer and the identity of the candidate it checked.
2. Require all mandatory checks to complete successfully. Missing, skipped, errored, or untrusted evidence remains unsatisfied.
3. Block unresolved findings in categories the release policy defines as mandatory stops.
4. Route ambiguity, conflicting assessments, and policy-required risk decisions to an authorized human.
5. Permit progression only within the scope of the satisfied policy and approval.

A policy may provide an explicit exception process. That process needs its own authority, scope, rationale, and expiration. An agent's confidence should never create an implicit exception.

For the illustrative refund change, the outcomes would look like this:

| Evidence state | Proposed decision |
|---|---|
| Calculation tests pass; required authorization test fails | Block and repair |
| Required reviewer job times out | Required evidence is missing; hold |
| AI reviewers disagree about the refund requirement | Request requirement clarification and human review |
| Human approval covers an earlier revision | Revalidate the approval's applicability before proceeding |
| Required checks and scoped approval cover the current candidate | Eligible for the next gate under policy |

Merge eligibility and deployment eligibility remain separate decisions. The deployment system must verify the artifact it receives, the applicable policy, and any deployment-specific approvals.

## Make freshness a relationship

A recent timestamp is insufficient. Evidence must cover the state that matters to the decision.

A code update, a changed base branch, a revised specification, or a new release policy can invalidate earlier evidence. The pipeline needs explicit rules for which checks must run again and when approval must be renewed. For a high-consequence change, I would default to repeating affected verification whenever applicability is uncertain.

This does not require rerunning every check after every edit. It requires a defensible dependency between a check and what it covers. Risk-based selection should retain mandatory checks and record omissions. Periodic broader runs can help detect selection mistakes; they cannot protect a release from a defect already missed by the selected suite.

The deployment boundary also needs to prevent the candidate from changing between the final check and the authorized action. Otherwise, even a correct evidence record can be used to authorize the wrong artifact.

## Measure the reviewer, including what it misses

An agent reporting high confidence is making another claim to evaluate.

Calibration asks whether findings assigned a given confidence are correct at roughly that frequency. It does not answer how many defects produced no finding at all. A reviewer could be accurate about the few problems it reports while missing most serious issues.

Before increasing autonomy, I would evaluate the reviewer against a versioned set of realistic changes containing independently adjudicated defects and valid changes. Keep evaluation-only cases separate from the material used to tune the reviewer.

| Measure | Decision it informs |
|---|---|
| Missed defects by severity and category | Which changes still need additional review |
| False alarms on valid changes | Whether the reviewer creates an excessive human queue |
| Correctness of reported findings | Whether findings are useful enough to act on |
| Calibration of confidence | Whether confidence can guide triage |
| Variation across repeated runs | Whether the same change receives unstable assessments |
| Latency and cost per reviewed change | Whether verification fits the delivery budget |

Include wrong specifications, stale approvals, weakened tests, and conflicting reviewers in the evaluation. Record the model, configuration, instructions, tools, and test-set revision so later changes can be compared fairly.

Seeded defects can test a known failure mechanism. They do not establish production effectiveness on their own. That requires monitoring escaped defects, review outcomes, and workload after deployment, with the remaining uncertainty visible.

## Adopt one boundary first

I would begin with one repository and one consequential class of change. Preserve existing required checks and human approval while producing the record alongside them. Ask whether a reviewer can trace every release condition to evidence for the current candidate.

First ask whether the record exposes a missing check, stale approval, or unresolved finding hidden by the status summary. Faster review and better defect detection remain claims to measure.

This complements [how I review AI-built public work](/writing/reviewing-ai-built-public-work/): the person owns the requirement, the acceptable risk, and the release decision. The pipeline's job is to make the evidence for that decision current, specific, and difficult to misrepresent.
