# Failure Recovery

## Purpose

This runtime rule defines how the Cartolab BMAD system recovers from failed runs, failed handoffs, failed reviews, failed QA, failed deployments, and broken state.

Failure is expected.
Unrecorded failure is dangerous.

## Core rule

Every failure must produce evidence, owner, impact, and next safe action.

Do not retry blindly.
Do not hide failures.
Do not mark work complete after a failed gate.

## Failure categories

| Category | Example | Primary owner |
|---|---|---|
| agent_run_failed | Adapter crashed, command missing, timeout | BroMaster / platform owner |
| handoff_failed | Target agent cannot act due to missing context | BroMaster |
| implementation_failed | Build/test error or incomplete code | BroBuilder |
| review_failed | Technical review failed | BroReview / BroBuilder |
| qa_failed | Acceptance criteria failed | BroQA / BroBuilder |
| deploy_failed | Build, startup, health check, or runtime failure | BroDeploy / BroBuilder |
| artifact_conflict | PRD, architecture, stories, or status conflict | BroDocs / BroMaster |
| state_drift | Paperclip and SPRINT_STATUS disagree | BroMaster |

## Failure recovery format

FAILURE_RECOVERY_REPORT:

Failure Type:
[category]

Detected By:
[Agent]

Current State:
[BMAD phase and Paperclip state]

Evidence:
- [Log, command output, review result, QA result, screenshot, artifact path]

Impact:
[What is blocked or unsafe]

Root Cause Hypothesis:
[Best explanation based on evidence]

Immediate Safe Action:
[stop | retry | rollback | return to owner | request clarification | update artifact]

Required Owner:
[BroMaster | BroArchitect | BroDesign | BroBuilder | BroReview | BroQA | BroDeploy | BroDocs | User]

Next Step:
[Exact next action]
END_FAILURE_RECOVERY_REPORT

## Agent run failure

Use when an agent fails due to runtime, adapter, timeout, missing CLI, missing credentials, missing path, or environment issue.

Recovery steps:

1. Capture error evidence.
2. Do not assume the task completed.
3. Keep or move work to blocked.
4. Identify whether failure is platform, adapter, model, prompt, or input related.
5. Assign owner.
6. Retry only after root cause is addressed or safe retry is justified.

Examples:

- command not found in PATH
- model quota exceeded
- authentication failed
- timeout fired
- external instructions path missing

## Handoff failure

Use when a target agent cannot act because the handoff is incomplete or invalid.

Recovery steps:

1. Target agent returns BLOCKED.
2. BroMaster corrects handoff.
3. Missing artifact or field is added.
4. Work returns to previous safe state.

Do not continue with guessed scope.

## Implementation failure

Use when BroBuilder cannot complete or verify implementation.

Recovery steps:

1. Capture error output and changed files.
2. Identify whether failure is requirement, architecture, dependency, test, or code issue.
3. If requirement or architecture is missing, escalate to BroMaster.
4. If code issue, revise implementation.
5. Re-run verification.
6. Send updated handoff to BroReview.

## Technical review failure

Use when BroReview fails the implementation.

Recovery steps:

1. BroReview creates TECHNICAL_REVIEW_RESULT with failed findings.
2. BroBuilder receives required changes.
3. Story returns to in_progress or assigned.
4. BroBuilder revises.
5. BroReview reviews again.

Do not move to QA after failed technical review.

## QA failure

Use when BroQA finds functional defects.

Recovery steps:

1. BroQA creates QA_RESULT or BUG_REPORT with reproduction steps.
2. Story returns to BroBuilder.
3. BroBuilder fixes the behavior.
4. BroReview re-checks technical impact if code changed materially.
5. BroQA validates again.

Do not deploy after failed QA.

## Deployment failure

Use when BroDeploy cannot successfully release or validate release.

Recovery steps:

1. Capture workflow logs, service status, health check, or runtime evidence.
2. Identify failure point: build, start, health check, runtime, network, secret, unknown.
3. Stop unsafe repeated deploys.
4. If previous production is stable, avoid destructive rollback unless required.
5. Assign owner based on failure type.
6. Return to BroBuilder for code/config issue or BroDeploy for release process issue.
7. Re-deploy only after fix and gates are restored.

## Artifact conflict

Use when artifacts contradict each other.

Recovery steps:

1. BroDocs reports conflict.
2. BroMaster identifies authoritative source.
3. Relevant owner updates artifact.
4. SPRINT_STATUS.yaml is corrected if affected.
5. Work resumes from last safe state.

## State drift

Use when Paperclip state and SPRINT_STATUS.yaml disagree.

Recovery steps:

1. Compare Paperclip state, SPRINT_STATUS.yaml, and latest handoff evidence.
2. Identify the latest reliable evidence.
3. Correct SPRINT_STATUS.yaml or Paperclip state.
4. Record the correction reason.

## Retry rules

Retry is allowed when:

- failure was transient
- no state corruption occurred
- no duplicate deployment risk exists
- required credentials and paths are valid
- previous attempt did not partially complete unsafe work

Do not retry when:

- root cause is unknown and failure is destructive
- deployment is already running
- review or QA failed due to real defect
- missing artifact or requirement caused the failure

## Recovery closure

A failure is closed when:

- cause is understood or safely mitigated
- owner completed the next action
- affected artifacts are updated
- story status is corrected
- blocked state is resolved or transferred to follow-up

## Principle

Recover from the last safe state.
Do not pretend the failed step succeeded.
