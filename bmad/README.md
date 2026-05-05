# Cartolab BMAD Core Operating Model

This folder defines the BMAD-inspired operating layer for Cartolab's Paperclip software house.

Paperclip remains the operational control plane: org chart, agents, issues, heartbeats, goals, costs, and execution tracking.

BMAD defines the delivery method: artifact-first planning, specialized roles, clean handoffs, and story-by-story implementation.

## Core principle

Artifacts are the source of truth.

Chat messages, comments, and agent memory are not the source of truth. Every meaningful decision, requirement, architecture rule, story, readiness check, and review must be captured in a durable artifact.

## Required planning sequence

The Cartolab software house follows this sequence before implementation starts:

1. Project Context
2. PRD
3. Architecture
4. Epics and Stories
5. Implementation Readiness Check
6. Sprint Status
7. Story-by-story implementation
8. Code Review
9. QA validation when required
10. Retrospective and documentation update

## Non-negotiable rules

- Do not start implementation from chat context alone.
- Do not ask BroBuilder to implement unless a story exists.
- Do not create final stories before Architecture exists.
- Do not deploy directly from implementation.
- Do not skip technical review.
- Do not treat Paperclip subtasks as a substitute for BMAD artifacts.
- Do not let agent memory replace written project knowledge.

## Artifact ownership

| Artifact | Owner | Purpose |
|---|---|---|
| PROJECT_CONTEXT.md | StudioBridge / BroMaster | Capture raw product context and discovery output. |
| PRD.md | BroMaster | Define product requirements, scope, goals, and constraints. |
| ARCHITECTURE.md | BroArchitect | Define technical approach, system boundaries, data flow, and constraints. |
| EPICS_AND_STORIES.md | BroMaster | Convert product and architecture into implementable epics and stories. |
| IMPLEMENTATION_READINESS.md | BroMaster + BroArchitect | Verify that the project is ready for story implementation. |
| SPRINT_STATUS.yaml | BroMaster | Track execution state story by story. |
| stories/story-template.md | BroMaster | Standard structure for implementation stories. |
| reviews/code-review-template.md | BroReview | Standard structure for technical review. |
| retrospectives/retrospective-template.md | BroDocs / BroMaster | Capture learning after delivery. |

## Agent role mapping

| Agent | BMAD-style role | Responsibility |
|---|---|---|
| BroStorm | Discovery / Analyst input | Explores ideas and creates early project context outside the board. |
| StudioBridge | Context adapter | Transfers Studio context into Paperclip as structured project input. |
| BroMaster | PM / Orchestrator | Owns PRD, planning, sequencing, readiness, sprint status, and flow control. |
| BroArchitect | Architect | Owns architecture and technical constraints. |
| BroDesign | UX Designer | Owns UX specification and design system decisions when UI is involved. |
| BroBuilder | Developer | Implements approved stories only. |
| BroReview | Technical reviewer | Reviews implementation against story and architecture. |
| BroQA | QA gate | Validates functional behavior and acceptance criteria when required. |
| BroDeploy | Release / DevOps | Deploys only after review and QA gates pass. |
| BroDocs | Documentation authority | Maintains durable documentation and decision history. |

## Workflow overview

### 1. Context capture

StudioBridge brings project context from Studio into Paperclip.

Output:

- PROJECT_CONTEXT.md

### 2. Product planning

BroMaster transforms context into product requirements.

Output:

- PRD.md

### 3. Architecture

BroArchitect defines the system design and technical constraints.

Output:

- ARCHITECTURE.md

### 4. Epics and stories

BroMaster creates epics and stories only after PRD and Architecture exist.

Output:

- EPICS_AND_STORIES.md

### 5. Readiness check

BroMaster and BroArchitect verify that implementation can begin safely.

Output:

- IMPLEMENTATION_READINESS.md

### 6. Sprint execution

BroMaster creates and updates the sprint status artifact. BroBuilder implements one story at a time.

Output:

- SPRINT_STATUS.yaml
- stories/story-XXX.md files

### 7. Review and validation

BroReview validates code quality. BroQA validates functional behavior when required.

Output:

- reviews/story-XXX-code-review.md
- QA notes inside story or sprint status

### 8. Retrospective

BroDocs and BroMaster capture lessons learned and update documentation.

Output:

- retrospectives/epic-XXX-retrospective.md

## Definition of ready for implementation

A story is ready for BroBuilder only when:

- PRD exists.
- Architecture exists.
- Epic exists.
- Story has acceptance criteria.
- Story has dependencies listed.
- Story has expected output.
- Story has verification method.
- Technical constraints are clear.

## Definition of done

A story is done only when:

- Implementation is complete.
- Acceptance criteria are satisfied.
- BroReview has passed the technical review.
- BroQA has passed validation when required.
- Sprint status has been updated.
- Documentation has been updated if behavior or usage changed.

## How to use this folder

For each new project, copy the relevant templates or create project-specific versions under the project workspace.

The canonical flow stays here. Project-specific artifacts may live under a project folder, issue workspace, or generated work product area, depending on Paperclip runtime configuration.
