# Workflow Gates

This document defines the gates that control movement through the Cartolab BMAD workflow inside Paperclip.

## Core principle

No agent may move work forward just because a task exists.

Work advances only when the required gate conditions are satisfied.

## Gate 1: Context Gate

Owner: BroMaster

Required before PRD creation.

Inputs:

- PROJECT_CONTEXT.md or equivalent StudioBridge context

Pass conditions:

- problem is clear
- target users are identified
- business goal is stated
- known constraints are listed
- open questions are explicit

Failure action:

- block planning
- request missing context

Next owner:

- BroMaster

Next artifact:

- PRD.md

## Gate 2: PRD Gate

Owner: BroMaster

Required before Architecture.

Inputs:

- PROJECT_CONTEXT.md
- PRD.md

Pass conditions:

- product goals are defined
- functional requirements are listed
- non-functional requirements are listed
- non-goals are explicit
- business rules are documented
- integrations are identified
- unresolved questions are marked as blockers or accepted risks

Failure action:

- revise PRD
- request clarification when business logic is missing

Next owner:

- BroArchitect

Next artifact:

- ARCHITECTURE.md

## Gate 3: Architecture Gate

Owner: BroArchitect

Required before final epics and stories.

Inputs:

- PRD.md
- ARCHITECTURE.md

Pass conditions:

- stack is defined
- system components are defined
- data flow is clear
- integrations are mapped
- security constraints are listed
- technical constraints are actionable
- trade-offs are documented

Failure action:

- return to BroArchitect for revision
- escalate to BroMaster if product constraints conflict with architecture

Next owner:

- BroMaster

Next artifact:

- EPICS_AND_STORIES.md

## Gate 4: Story Readiness Gate

Owner: BroMaster

Required before BroBuilder implementation.

Inputs:

- PRD.md
- ARCHITECTURE.md
- EPICS_AND_STORIES.md
- story file
- SPRINT_STATUS.yaml

Pass conditions:

- story has clear user outcome
- story maps to requirements
- story references architecture constraints
- acceptance criteria are testable
- dependencies are explicit
- expected output is defined
- verification method is defined

Failure action:

- keep story in planned or blocked state
- do not mention BroBuilder for implementation

Next owner:

- BroBuilder

Next artifact:

- implemented story output

## Gate 5: Technical Review Gate

Owner: BroReview

Required after BroBuilder implementation.

Inputs:

- story file
- implementation summary
- changed files / work product
- architecture references

Pass conditions:

- implementation satisfies story scope
- code follows architecture constraints
- no obvious maintainability issues
- no unauthorized architecture decisions
- verification evidence is present

Failure action:

- return to BroBuilder
- update review status as failed
- list required changes

Next owner:

- BroQA if QA is required
- BroMaster if QA is not required

Next artifact:

- reviews/story-XXX-code-review.md

## Gate 6: QA Gate

Owner: BroQA

Required when functional validation is needed.

Inputs:

- story file
- implementation output
- code review result
- acceptance criteria

Pass conditions:

- acceptance criteria pass
- critical user flows work
- edge cases are considered
- regressions are not detected within scope

Failure action:

- return to BroBuilder
- update QA status as failed
- list reproduction steps and expected behavior

Next owner:

- BroDeploy when deploy is required
- BroMaster when deploy is not required

## Gate 7: Deploy Gate

Owner: BroDeploy

Required before release.

Inputs:

- passing technical review
- passing QA or QA not required decision
- deployment target
- rollback or recovery notes when applicable

Pass conditions:

- build succeeds
- environment is correct
- release steps are clear
- post-deploy validation is defined
- rollback path is known when needed

Failure action:

- block release
- report deploy failure
- return to BroBuilder or BroDeploy depending on cause

Next owner:

- BroMaster / BroDocs

## Gate 8: Documentation and Retrospective Gate

Owner: BroDocs + BroMaster

Required before closing larger epics or projects.

Inputs:

- delivered stories
- review results
- QA results
- deployment notes
- decision history

Pass conditions:

- documentation reflects delivered behavior
- important decisions are captured
- follow-up tasks are listed
- retrospective is completed when required

Failure action:

- keep project open
- request documentation updates

Next owner:

- BroMaster

## Emergency override

Only the user may override a gate.

If a gate is overridden, BroMaster must record:

- which gate was bypassed
- who approved the bypass
- why it was approved
- risk accepted
- follow-up mitigation

## Gate summary

Context -> PRD -> Architecture -> Story Readiness -> Implementation -> Technical Review -> QA -> Deploy -> Documentation
