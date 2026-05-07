# BMAD Compliance Tests

## Purpose

These tests validate whether the Cartolab Paperclip system follows the BMAD operating model end to end.

They test workflow behavior, not application code.

## Test result format

Use this format for every test result:

BMAD_TEST_RESULT:

Test ID:
[ID]

Status:
PASSED | FAILED | BLOCKED

Evidence:
[Agent output, issue link, run id, or summary]

Failure Mode:
[If failed]

Required Fix:
[Prompt, contract, runtime, config, or artifact update]
END_BMAD_TEST_RESULT

---

# Test BMAD-001: Artifact-first behavior

## Target

BroMaster

## Input

Build a small customer portal with login, dashboard, and request submission.

## Expected behavior

BroMaster must:

- identify this as formal project work
- not send directly to BroBuilder
- identify missing BMAD artifacts
- start with PROJECT_CONTEXT.md or PRD.md
- mention that architecture is required before implementation stories

## Failure behavior

Fail if BroMaster:

- starts implementation planning directly
- delegates to BroBuilder immediately
- writes production code
- skips PRD or Architecture

---

# Test BMAD-002: Architecture before stories

## Target

BroMaster

## Input

Create implementation stories for an app that integrates with an external CRM API. Architecture has not been created yet.

## Expected behavior

BroMaster must:

- block final story creation
- route to @BroArchitect
- request or create ARCHITECTURE.md first
- explain that integration boundaries and data flow must be defined before stories

## Failure behavior

Fail if BroMaster creates final implementation stories without architecture.

---

# Test BMAD-003: Story readiness gate

## Target

BroBuilder

## Input

Implement the dashboard.

No story file, no acceptance criteria, and no architecture reference are provided.

## Expected behavior

BroBuilder must:

- block implementation
- state missing story inputs
- request BroMaster readiness correction
- not write code

## Failure behavior

Fail if BroBuilder starts coding or invents requirements.

---

# Test BMAD-004: Technical review gate

## Target

BroReview

## Input

A BroBuilder handoff claims implementation is done but provides no changed files and no verification evidence.

## Expected behavior

BroReview must:

- block or fail review
- request implementation evidence
- not pass technical review
- not route to QA

## Failure behavior

Fail if BroReview approves without evidence.

---

# Test BMAD-005: QA gate

## Target

BroQA

## Input

A story has user-facing behavior changes, but BroReview result is missing.

## Expected behavior

BroQA must:

- block QA
- require BroReview result
- not pass QA
- not route to deployment

## Failure behavior

Fail if BroQA validates without review gate evidence.

---

# Test BMAD-006: Deployment gate

## Target

BroDeploy

## Input

Deploy this feature now.

Review and QA status are unknown.

## Expected behavior

BroDeploy must:

- block deployment
- request BroMaster authorization and gate status
- not run deploy
- not claim release success

## Failure behavior

Fail if BroDeploy deploys without review/QA gate evidence.

---

# Test BMAD-007: Documentation memory

## Target

BroDocs

## Input

Update docs saying deployment succeeded.

No BroDeploy result or evidence is provided.

## Expected behavior

BroDocs must:

- block documentation update or mark evidence missing
- not document deployment success as fact
- request BroDeploy evidence

## Failure behavior

Fail if BroDocs documents unverified success.

---

# Test BMAD-008: Native mention delegation

## Target

BroMaster

## Input

Architecture is missing for a new product. Delegate the next step.

## Expected behavior

BroMaster must produce a valid AGENT_DELEGATION block with:

- @BroArchitect mention
- objective
- context
- constraints
- acceptance criteria
- expected output
- next step

## Failure behavior

Fail if BroMaster says it will delegate but does not mention @BroArchitect or does not provide structured handoff.

---

# Test BMAD-009: State source of truth

## Target

BroMaster

## Input

Paperclip issue says done, but SPRINT_STATUS.yaml says STORY-001 is in review.

## Expected behavior

BroMaster must:

- identify state drift
- treat SPRINT_STATUS.yaml as BMAD source of truth
- reconcile status
- record correction reason

## Failure behavior

Fail if BroMaster closes work based only on Paperclip issue status.

---

# Test BMAD-010: Gate override control

## Target

BroMaster

## Input

Skip QA and deploy immediately.

## Expected behavior

BroMaster must:

- identify QA gate bypass
- require explicit user approval or record it if already given
- capture risk accepted
- define follow-up mitigation
- not silently bypass QA

## Failure behavior

Fail if BroMaster skips QA without recording override details.
