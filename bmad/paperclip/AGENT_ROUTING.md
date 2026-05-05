# Agent Routing

This document maps BMAD responsibilities to Cartolab Paperclip agents.

Use this file when BroMaster needs to decide who owns the next step.

## Routing principle

Route by artifact and responsibility, not by convenience.

Do not assign work to an agent just because it is available.
Assign work to the agent that owns the artifact or gate.

## Agent map

| Agent | BMAD responsibility | Owns | Must not own |
|---|---|---|---|
| BroStorm | Discovery input | Early idea exploration outside the board | Execution, architecture, implementation |
| StudioBridge | Context adapter | Transfer Studio context into Paperclip | Product decisions, technical decisions |
| BroMaster | PM / Orchestrator | PRD, epics, stories, readiness, sprint status, flow control | Code, architecture implementation, QA execution, deploy |
| BroArchitect | Architect | Architecture, technical constraints, system decisions | Business scope, sprint management, UI design |
| BroDesign | UX Designer | UX spec, design system, screens, flows | Backend logic, architecture, database design |
| BroBuilder | Developer | Story implementation | Product scope, architecture decisions, QA approval, deploy approval |
| BroReview | Technical reviewer | Code review and architecture adherence validation | Implementation ownership, product scope |
| BroQA | QA gate | Functional validation and acceptance criteria verification | Architecture, implementation, deployment |
| BroDeploy | Release / DevOps | Build, deploy, release validation | Product planning, implementation approval |
| BroDocs | Documentation authority | Decision history, documentation consistency, retrospective artifacts | Product decisions, architecture decisions |

## Artifact routing

| Artifact / Need | Route to |
|---|---|
| PROJECT_CONTEXT.md missing or incomplete | StudioBridge / BroMaster |
| PRD.md missing or incomplete | BroMaster |
| ARCHITECTURE.md missing or incomplete | BroArchitect |
| UX_SPEC.md needed | BroDesign |
| EPICS_AND_STORIES.md missing or incomplete | BroMaster |
| IMPLEMENTATION_READINESS.md missing or blocked | BroMaster + BroArchitect |
| SPRINT_STATUS.yaml missing or stale | BroMaster |
| Story implementation | BroBuilder |
| Technical review | BroReview |
| Functional validation | BroQA |
| Deployment | BroDeploy |
| Documentation cleanup | BroDocs |
| Retrospective | BroDocs + BroMaster |

## Default routing sequence

1. StudioBridge -> BroMaster for project context intake.
2. BroMaster -> BroArchitect when architecture is required.
3. BroMaster -> BroDesign when UI/UX is required.
4. BroMaster -> BroBuilder only after story readiness is satisfied.
5. BroBuilder -> BroReview after implementation.
6. BroReview -> BroQA when QA is required.
7. BroQA -> BroDeploy only after validation passes.
8. BroDeploy -> BroDocs / BroMaster after release.

## Escalation rules

Escalate to BroMaster when:

- scope is unclear
- acceptance criteria are missing
- agent responsibilities conflict
- implementation is blocked by missing artifacts
- review or QA fails repeatedly

Escalate to BroArchitect when:

- implementation requires a new technical pattern
- architecture constraints are unclear
- integration boundaries are missing
- data model or API decisions are required

Escalate to the user when:

- business logic is ambiguous
- scope decision cannot be inferred
- a trade-off affects budget, timeline, or product direction

## Anti-patterns

Do not route:

- implementation directly from StudioBridge to BroBuilder
- deploy directly from BroBuilder to BroDeploy
- architecture decisions to BroBuilder
- QA validation to BroReview only
- documentation ownership to implementation agents

## Handoff requirement

Every handoff must include:

- objective
- context
- constraints
- acceptance criteria
- expected output
- next step
