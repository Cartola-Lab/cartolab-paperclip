# Definition of Done

## Purpose

This contract defines when a story can be considered complete in the Cartolab BMAD workflow.

A story is not done just because code was written.
A story is done only when the required quality, validation, deployment, and documentation gates have been satisfied.

## Core rule

Done means verified, reviewed, and recorded.

## Required completion conditions

A story is done when all required conditions are true:

- implementation is complete
- acceptance criteria are satisfied
- BroReview technical review passed
- BroQA passed or QA was explicitly marked not required by BroMaster
- deployment passed or deployment was explicitly not required
- SPRINT_STATUS.yaml is updated
- documentation is updated when behavior, usage, architecture, or operations changed
- blockers are closed or transferred to follow-up tasks
- BroMaster confirms closure

## Implementation completion

Implementation is complete when:

- assigned scope is implemented
- unrelated scope was not introduced
- changed files are listed
- verification evidence is provided
- known risks are documented

Implementation alone does not make a story done.

## Acceptance criteria completion

Each acceptance criterion must be marked:

- passed
- failed
- not verified
- not applicable with reason

A story cannot be done when must-have criteria are failed or not verified without explicit BroMaster/user approval.

## Technical review completion

BroReview must pass technical review unless BroMaster records an explicit emergency override.

Technical review validates:

- story scope alignment
- architecture adherence
- maintainability
- security boundaries
- verification evidence
- absence of unrelated changes

Failed review returns the story to BroBuilder.

## QA completion

QA is required when:

- user-facing behavior changed
- business logic changed
- data behavior changed
- integration behavior changed
- regression risk is meaningful
- BroMaster marks QA required

QA may be skipped only when BroMaster records why it is not required.

Failed QA returns the story to BroBuilder with a reproducible defect report.

## Deployment completion

Deployment is required when:

- the story affects production runtime
- code or config must be released
- behavior must be available in the deployed app
- BroMaster marks deployment required

Deployment completion requires BroDeploy evidence:

- workflow success
- service/container status
- health check
- smoke test
- logs when relevant

If deployment is not required, BroMaster must record why.

## Documentation completion

Documentation must be updated when:

- user behavior changes
- API behavior changes
- architecture changes
- deployment process changes
- operational process changes
- agent workflow changes
- important decisions were made

BroDocs owns documentation consistency but source agents must provide evidence.

## Sprint status completion

SPRINT_STATUS.yaml must reflect final state.

Required updates:

- story status: done
- review_status: passed
- qa_status: passed or not_required
- deploy_status: deployed or not_required
- blockers resolved or moved to follow-up
- activity log updated

## Closure record

BroMaster should record closure using this structure:

STORY_CLOSURE:

Story:
[Story ID and title]

Final Status:
DONE

Acceptance Criteria:
- [criterion]: passed

Review:
passed | override with reason

QA:
passed | not_required with reason

Deploy:
deployed | not_required with reason

Documentation:
updated | not_required with reason

Remaining Follow-ups:
- [follow-up or none]

Closure Reason:
[Why this story is complete]
END_STORY_CLOSURE

## Not done examples

Not done:

BroBuilder implemented the code but review has not passed.

Reason:
Technical review gate is missing.

Not done:

Review passed but QA required behavior was not validated.

Reason:
QA gate is missing.

Not done:

Deploy ran but health check failed.

Reason:
Deployment validation failed.

Not done:

Feature works but docs are stale.

Reason:
Documentation gate is missing when behavior changed.

## Done anti-patterns

Do not mark done when:

- only implementation is complete
- tests were skipped without reason
- BroReview did not pass
- QA is unclear
- deployment evidence is missing
- acceptance criteria are vague
- SPRINT_STATUS.yaml was not updated
- documentation needs are ignored

## Override rule

Only the user or BroMaster with explicit user authorization may override a required gate.

Every override must record:

- gate bypassed
- approver
- reason
- accepted risk
- follow-up mitigation

## Enforcement

BroMaster owns final done decision.

Specialized agents provide evidence.

BroDocs preserves the closure record when required.
