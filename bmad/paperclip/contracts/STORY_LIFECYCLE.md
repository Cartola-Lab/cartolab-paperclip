# Story Lifecycle Contract

## Purpose

This contract defines the official story lifecycle for Cartolab's BMAD workflow inside Paperclip.

Stories are the atomic implementation unit.

A story must move through controlled states with clear owners and gates.

## Lifecycle states

| State | Meaning | Primary owner |
|---|---|---|
| draft | Story is being shaped and is not ready for implementation. | BroMaster |
| planned | Story exists in planning but is not yet ready. | BroMaster |
| ready | Story satisfies Definition of Ready. | BroMaster |
| assigned | Story has been delegated to an execution agent. | BroMaster / target agent |
| in_progress | Assigned agent is actively working. | Target agent |
| review | Implementation is ready for technical review. | BroReview |
| qa | Technical review passed and functional validation is required. | BroQA |
| ready_for_deploy | Review and QA gates passed, deployment may be authorized. | BroMaster |
| deploying | Deployment is in progress. | BroDeploy |
| done | Story is complete and all required gates passed. | BroMaster |
| blocked | Work cannot proceed safely. | Responsible owner |

## Standard transition path

STANDARD_PATH:
draft -> planned -> ready -> assigned -> in_progress -> review -> qa -> ready_for_deploy -> deploying -> done
END_STANDARD_PATH

QA and deploy may be skipped only when BroMaster explicitly marks them as not required and records why.

## Transition rules

### draft -> planned

Allowed when:

- story has initial scope
- related epic is identified
- project context exists

Owner:

- BroMaster

### planned -> ready

Allowed when:

- Definition of Ready is satisfied
- story maps to PRD
- architecture references exist
- acceptance criteria are testable
- dependencies are explicit

Owner:

- BroMaster

### ready -> assigned

Allowed when:

- BroMaster delegates using AGENT_DELEGATION
- target agent is correct for the work
- handoff includes objective, context, constraints, acceptance criteria, expected output, and next step

Owner:

- BroMaster

### assigned -> in_progress

Allowed when:

- target agent accepts the assignment
- required inputs are available
- no blocker is reported

Owner:

- target agent

### in_progress -> review

Allowed when:

- implementation handoff exists
- changed files or work evidence are listed
- acceptance criteria coverage is reported
- verification evidence is provided or explicitly marked not run with reason

Owner:

- BroBuilder

### review -> qa

Allowed when:

- BroReview passes technical review
- QA is required

Owner:

- BroReview / BroMaster

### review -> ready_for_deploy

Allowed when:

- BroReview passes technical review
- QA is explicitly not required
- BroMaster records the QA bypass reason

Owner:

- BroMaster

### qa -> ready_for_deploy

Allowed when:

- BroQA passes functional validation
- no critical defects remain

Owner:

- BroQA / BroMaster

### ready_for_deploy -> deploying

Allowed when:

- BroMaster authorizes deployment
- deploy gate is satisfied
- BroDeploy receives valid handoff

Owner:

- BroMaster / BroDeploy

### deploying -> done

Allowed when:

- BroDeploy reports deployment success when deployment is required
- documentation update is complete when behavior changed
- SPRINT_STATUS.yaml is updated

Owner:

- BroMaster

## Blocked transitions

Any state may transition to blocked when:

- required artifact is missing
- acceptance criteria are unclear
- architecture is missing or unsafe
- implementation evidence is missing
- technical review fails
- QA fails
- deployment fails
- user/business decision is required

A blocked story must include:

- reason
- owner
- required next action
- risk if guessed

## Unblocking rule

A blocked story may return only to the last safe state after the blocker is resolved.

Examples:

- blocked during planning -> planned
- blocked during implementation -> assigned or in_progress
- blocked during review -> review
- blocked during QA -> qa
- blocked during deploy -> ready_for_deploy or deploying

## Ownership rules

BroMaster owns state governance.

Specialized agents own state evidence for their phase:

- BroBuilder owns implementation evidence.
- BroReview owns technical review decision.
- BroQA owns functional validation decision.
- BroDeploy owns deployment evidence.
- BroDocs owns documentation and retrospective evidence.

## Status tracking

SPRINT_STATUS.yaml is the canonical BMAD status tracker.

Paperclip issue status should reflect operational state but does not replace SPRINT_STATUS.yaml.

If they conflict:

1. Trust SPRINT_STATUS.yaml for BMAD state.
2. Correct Paperclip state when possible.
3. Record the correction reason.

## Invalid transitions

Invalid:

planned -> in_progress

Reason:
Story skipped readiness and assignment.

Invalid:

in_progress -> deploying

Reason:
Review and QA gates were skipped.

Invalid:

review -> done

Reason:
QA, deployment, and documentation closure may still be required.

Invalid:

blocked -> done

Reason:
Blocker must be resolved first.
