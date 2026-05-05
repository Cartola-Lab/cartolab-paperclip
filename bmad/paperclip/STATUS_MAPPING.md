# Status Mapping

This document maps BMAD execution states to Paperclip issue and workflow behavior.

## Core principle

Paperclip status reflects operational progress.
BMAD artifacts define methodological readiness.

A Paperclip issue can be open or in progress while BMAD readiness is still blocked.

## BMAD state model

| BMAD state | Meaning |
|---|---|
| context_needed | Project context is missing or incomplete. |
| prd_needed | Product requirements are missing or incomplete. |
| architecture_needed | Architecture is required before stories can be finalized. |
| stories_needed | Epics and stories have not been created or are incomplete. |
| readiness_check | BroMaster and BroArchitect are validating implementation readiness. |
| ready_for_implementation | Stories may be assigned to BroBuilder. |
| implementing | BroBuilder is implementing a ready story. |
| technical_review | BroReview is validating implementation quality. |
| qa_validation | BroQA is validating acceptance criteria and behavior. |
| ready_for_deploy | Review and QA gates passed. |
| deploying | BroDeploy is releasing the work. |
| completed | Work is delivered, verified, and documented. |
| blocked | Execution cannot proceed safely. |

## Paperclip status mapping

| BMAD state | Paperclip status | Owner |
|---|---|---|
| context_needed | todo / blocked | BroMaster / StudioBridge |
| prd_needed | todo / in_progress | BroMaster |
| architecture_needed | todo / in_progress | BroArchitect |
| stories_needed | todo / in_progress | BroMaster |
| readiness_check | in_progress | BroMaster + BroArchitect |
| ready_for_implementation | todo / ready if available | BroMaster |
| implementing | in_progress | BroBuilder |
| technical_review | review / in_progress | BroReview |
| qa_validation | review / in_progress | BroQA |
| ready_for_deploy | todo / ready if available | BroDeploy |
| deploying | in_progress | BroDeploy |
| completed | done / closed | BroMaster |
| blocked | blocked | Responsible owner |

## Sprint status mapping

SPRINT_STATUS.yaml remains the canonical execution tracker for BMAD state.

Paperclip issue status should not contradict SPRINT_STATUS.yaml.

When conflict exists:

1. Treat SPRINT_STATUS.yaml as the BMAD source of truth.
2. Update Paperclip issue status to match operational reality.
3. Add a note explaining the correction.

## Story status lifecycle

A story should move through this lifecycle:

planned -> ready -> assigned -> in_progress -> review -> qa -> done

Blocked stories may move to:

blocked

and return to the previous safe state after resolution.

## Gate status fields

Each story in SPRINT_STATUS.yaml should track:

- review_status: not_started | passed | failed
- qa_status: not_required | not_started | passed | failed
- deploy_allowed: true | false

## Completion rules

A Paperclip issue may be closed only when:

- story status is done
- review_status is passed
- qa_status is passed or not_required
- documentation updates are complete when required
- BroMaster has confirmed completion

## Blocked rules

Use blocked when:

- required artifacts are missing
- architecture is incomplete
- acceptance criteria are unclear
- implementation depends on unresolved business logic
- review fails and BroBuilder must revise
- QA fails and BroBuilder must revise
- deploy cannot proceed safely

## Anti-patterns

Do not mark as completed when:

- implementation exists but review has not passed
- review passed but QA is required and not complete
- deploy happened but documentation is stale
- a Paperclip issue exists but BMAD artifacts are incomplete

Do not use Paperclip visual subtasks as the only source of execution status.
