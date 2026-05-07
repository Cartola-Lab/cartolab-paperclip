# Agent Handoff Contract

## Purpose

This contract defines the official structure for passing work between Cartolab Paperclip agents.

A handoff is not valid just because an agent is mentioned.
A handoff is valid only when it contains enough context, constraints, acceptance criteria, expected output, and next-step ownership.

## Core rule

Every handoff must be explicit, structured, and auditable.

Native Paperclip `@mentions` are the default delegation mechanism.
API-level delegation is exceptional and must be explicitly requested or operationally required.

## Required fields for every handoff

Every handoff must include:

- target agent
- objective
- context
- constraints
- acceptance criteria
- expected output
- next step
- blocker handling instruction when applicable

## Standard delegation format

AGENT_DELEGATION:
@TargetAgent

Objective:
[What must be done]

Context:
[Relevant project context, artifact paths, prior decisions, and current state]

Constraints:
- [Constraint 1]
- [Constraint 2]

Acceptance Criteria:
- [Criterion 1]
- [Criterion 2]

Expected Output:
[Artifact, code, review result, QA result, deployment result, or documentation update]

Next Step:
[Who receives the output next and why]

If Blocked:
[What the target agent must do instead of guessing]
END_AGENT_DELEGATION

## Valid target agents

- @BroArchitect
- @BroDesign
- @BroBuilder
- @BroReview
- @BroQA
- @BroDeploy
- @BroDocs

BroStorm and StudioBridge are not default downstream execution agents inside the Paperclip board.

## Artifact handoff format

Use this when handing off a document or artifact for review or continuation.

ARTIFACT_HANDOFF:
@TargetAgent

Artifact:
[path or artifact name]

Purpose:
[Why this artifact exists]

Current Status:
draft | ready | blocked | needs_revision

What Changed:
- [Change 1]

Review Needed:
[What the target agent must validate]

Acceptance Criteria:
- [Criterion 1]

Next Step:
[What happens after review]
END_ARTIFACT_HANDOFF

## Implementation handoff format

Used by BroBuilder after implementation.

IMPLEMENTATION_HANDOFF:

Story:
[Story ID and title]

Summary:
[What changed]

Files Changed:
- [file path]

Acceptance Criteria Coverage:
- [criterion]: passed | not verified | blocked

Verification Performed:
- [command or method]: passed | failed | not run

Architecture Compliance:
[How implementation follows ARCHITECTURE.md]

Known Risks or Limitations:
- [risk or none]

Next Step:
@BroReview should perform technical review.
END_IMPLEMENTATION_HANDOFF

## Technical review result format

Used by BroReview.

TECHNICAL_REVIEW_RESULT:

Story:
[Story ID and title]

Status:
PASSED | FAILED | NEEDS_ARCHITECTURE_CLARIFICATION

Summary:
[Short review summary]

Acceptance Criteria Review:
- [criterion]: passed | failed | not verified

Architecture Alignment:
Aligned | Not aligned | Needs clarification

Code Quality Notes:
- [note]

Verification Evidence:
- [command/method/evidence]: accepted | insufficient | failed

Findings:
- Severity: critical | major | minor
  Finding:
  Required Action:

Decision:
[Clear decision]

Next Step:
@BroQA for functional validation | @BroBuilder for revision | @BroArchitect for clarification | BroMaster for closure/deploy decision
END_TECHNICAL_REVIEW_RESULT

## QA result format

Used by BroQA.

QA_RESULT:

Story:
[Story ID and title]

Status:
PASSED | FAILED | BLOCKED

Summary:
[Short validation summary]

Acceptance Criteria Validation:
- [criterion]: passed | failed | not verified

Functional Flows Tested:
- [flow]: passed | failed | not verified

Regression Risks:
- [risk or none]

Evidence:
- [test, screenshot, command, API response, manual check, or explanation]

Defects:
- Severity: critical | major | minor
  Behavior:
  Expected:
  Actual:
  Reproduction Steps:
  Required Action:

Decision:
[Clear decision]

Next Step:
BroMaster for deploy decision | @BroBuilder for fix | BroMaster for clarification
END_QA_RESULT

## Deployment result format

Used by BroDeploy.

DEPLOYMENT_RESULT:

Status:
SUCCESS | FAILED | BLOCKED

Release Scope:
[What was deployed]

Trigger:
[GitHub Actions push to main | manual workflow | server command]

Evidence:
- [workflow run, command output, health check, URL check]

Validation:
- [check]: passed | failed | not verified

Risks or Notes:
- [risk or none]

Next Step:
Return to BroMaster for closure or BroDocs for documentation update.
END_DEPLOYMENT_RESULT

## Documentation update format

Used by BroDocs.

DOCS_UPDATE_RESULT:

Artifact Updated:
[File or artifact]

Reason:
[Why update was needed]

Summary of Changes:
- [Change]

Source Evidence:
- [Story, review, QA result, deployment result, user decision]

Open Questions:
- [Question or none]

Next Step:
[BroMaster review | no action | follow-up required]
END_DOCS_UPDATE_RESULT

## Blocked format

Any agent may use this when work cannot proceed safely.

BLOCKED:
Reason:
[Clear reason]

Missing Input or Evidence:
- [Item 1]
- [Item 2]

Risk if guessed:
[What could go wrong]

Required Owner:
BroMaster | BroArchitect | BroDesign | BroBuilder | BroReview | BroQA | BroDeploy | BroDocs | User

Required Next Action:
[What must happen next]
END_BLOCKED

## Invalid handoffs

Invalid:

@BroBuilder build this.

Reason:
Missing context, criteria, constraints, expected output, and next step.

Invalid:

I will ask BroArchitect.

Reason:
No actual native mention and no structured delegation.

Invalid:

@BroDeploy deploy it.

Reason:
Deploy gate status and evidence are missing.

## Enforcement

BroMaster must reject incomplete handoffs when they would cause ambiguous execution.

Specialized agents must block instead of guessing when handoff information is missing.
