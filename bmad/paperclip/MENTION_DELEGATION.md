# Mention Delegation

This document defines how BroMaster delegates work inside Paperclip using native agent mentions.

## Core principle

Use Paperclip native @mentions as the default delegation mechanism.

Do not use API calls for delegation unless explicitly requested by the user or required by a specific automation task.

## Delegation format

Use this structure when delegating to another agent:

AGENT_DELEGATION:
@TargetAgent

Objective:
[What must be done]

Context:
[Relevant project context and artifact references]

Constraints:
[Rules, limitations, dependencies]

Acceptance Criteria:
- [Criterion 1]
- [Criterion 2]

Expected Output:
[Artifact, review, code, validation result, or deployment result]

Next Step:
[Who receives the output next]
END_AGENT_DELEGATION

## Required behavior

A delegation is valid only when:

- the target agent is explicitly mentioned with @AgentName
- the objective is clear
- the context includes relevant artifact references
- acceptance criteria are specific
- expected output is stated
- next step is clear

## Valid target mentions

- @BroArchitect
- @BroDesign
- @BroBuilder
- @BroReview
- @BroQA
- @BroDeploy
- @BroDocs

BroStorm is not a board execution agent by default.
StudioBridge is an adapter, not a downstream execution agent.

## Example: architecture delegation

AGENT_DELEGATION:
@BroArchitect

Objective:
Create ARCHITECTURE.md for this project based on PRD.md.

Context:
PRD.md is ready. The project requires a technical architecture before stories can be finalized.

Constraints:
Do not implement code. Do not change product scope. Document stack, components, integrations, data flow, security, and technical constraints.

Acceptance Criteria:
- Tech stack is defined
- System components are identified
- Data flow is described
- Integration boundaries are clear
- Technical constraints for BroBuilder are actionable

Expected Output:
ARCHITECTURE.md ready for BroMaster review.

Next Step:
BroMaster will use the architecture to create EPICS_AND_STORIES.md.
END_AGENT_DELEGATION

## Example: implementation delegation

AGENT_DELEGATION:
@BroBuilder

Objective:
Implement STORY-001 according to the story file and architecture constraints.

Context:
STORY-001 is marked ready in SPRINT_STATUS.yaml. ARCHITECTURE.md and EPICS_AND_STORIES.md are available.

Constraints:
Do not introduce new architecture patterns. Do not change acceptance criteria. If blocked, report the blocker instead of guessing.

Acceptance Criteria:
- All story acceptance criteria are satisfied
- Implementation follows architecture constraints
- Relevant tests or verification steps are included

Expected Output:
Implemented story with summary of changed files and verification evidence.

Next Step:
Send to @BroReview for technical review.
END_AGENT_DELEGATION

## Invalid delegation examples

Invalid:

I will ask BroBuilder to handle it.

Reason:
No native mention and no structured handoff.

Invalid:

@BroBuilder build the app.

Reason:
No context, acceptance criteria, expected output, or next step.

Invalid:

@BroDeploy deploy after build.

Reason:
Deploy cannot happen before review and QA gates.

## API usage rule

API calls are not the default delegation mechanism.

Only use API calls when:

- the user explicitly requests API-level automation
- a Paperclip routine requires it
- native mention delegation is unavailable
- the task is specifically about debugging Paperclip API behavior

When using API calls, the agent must validate HTTP status and response body. However, BMAD execution should prefer native mentions and artifacts.
