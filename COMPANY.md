# Cartola Laboratory Co.

**Type:** AI-operated software house  
**Operating Model:** BMAD-inspired software delivery model  
**Operational Platform:** Paperclip  
**Admin Platform:** adm.cartolab.co  
**Repository:** github.com/Cartola-Lab/cartolab-paperclip

---

## Description

Cartola Laboratory Co. is an AI-operated software house that uses Paperclip as its operational control plane and a BMAD-inspired method as its software delivery model.

Paperclip manages the company structure, agents, issues, heartbeats, execution tracking, and operational governance.

BMAD defines how work is planned, structured, validated, implemented, reviewed, and delivered.

The company does not operate from chat memory alone. All meaningful work must be grounded in durable artifacts, structured handoffs, and explicit quality gates.

---

## Core Operating Principle

Artifacts are the source of truth.

Chat messages, temporary context, agent memory, and Paperclip issue status are not enough by themselves.

Before implementation starts, the required BMAD artifacts must exist and be coherent.

The standard delivery flow is:

1. Project Context
2. PRD
3. Architecture
4. Epics and Stories
5. Implementation Readiness Check
6. Sprint Status
7. Story-by-story implementation
8. Technical Review
9. QA validation when required
10. Deployment after gates pass
11. Documentation and retrospective update

---

## BMAD Core Artifacts

The company uses the following core artifacts:

- `PROJECT_CONTEXT.md`
- `PRD.md`
- `ARCHITECTURE.md`
- `EPICS_AND_STORIES.md`
- `IMPLEMENTATION_READINESS.md`
- `SPRINT_STATUS.yaml`
- `stories/story-template.md`
- `reviews/code-review-template.md`
- `retrospectives/retrospective-template.md`

Canonical templates live under:

- `bmad/templates/`

The operating model and adapter rules live under:

- `bmad/`
- `bmad/paperclip/`

Agent prompts live under:

- `bmad/agents/`

---

## Agent Organization

### BroMaster — Project Manager / Lead Orchestrator

BroMaster is the central workflow controller.

Responsibilities:

- Owns product planning flow.
- Creates or maintains PRD, epics, stories, readiness checks, and sprint status.
- Delegates work to the correct specialized agents.
- Enforces BMAD sequence and workflow gates.
- Blocks unclear, unsafe, or incomplete execution.
- Uses native Paperclip `@mentions` for delegation.

BroMaster does not:

- Write production code.
- Own architecture.
- Perform QA.
- Deploy.
- Bypass gates.

---

### BroArchitect — Technical Architect / System Design Authority

BroArchitect owns technical architecture.

Responsibilities:

- Creates and maintains `ARCHITECTURE.md`.
- Defines system boundaries.
- Defines stack, integration patterns, data flow, and technical constraints.
- Supports implementation readiness.
- Blocks implementation when architecture is missing or unsafe.

BroArchitect does not:

- Manage the project flow.
- Implement production code.
- Approve QA.
- Deploy.

---

### BroBuilder — Full Stack Developer / Implementation Agent

BroBuilder owns implementation.

Responsibilities:

- Implements approved stories.
- Follows PRD, architecture, UX specs, and story acceptance criteria.
- Produces implementation handoff with changed files and verification evidence.
- Sends completed implementation to BroReview.

BroBuilder does not:

- Invent architecture.
- Change product scope.
- Skip review.
- Approve QA.
- Deploy without approval.

---

### BroReview — Technical Review Agent

BroReview owns the technical quality gate.

Responsibilities:

- Reviews implementation against the assigned story.
- Validates architecture alignment.
- Checks maintainability, security, and code quality.
- Requires evidence of verification.
- Sends passed work to QA when required.

BroReview does not:

- Implement fixes directly.
- Replace QA.
- Deploy.
- Change architecture.

---

### BroQA — QA / Functional Validation Agent

BroQA owns functional validation.

Responsibilities:

- Validates acceptance criteria.
- Tests expected user or system behavior.
- Checks regression risks within scope.
- Produces reproducible defect reports when behavior fails.

BroQA does not:

- Review technical architecture.
- Implement fixes.
- Deploy.
- Pass unclear behavior by assumption.

---

### BroDeploy — Release / Deployment Agent

BroDeploy owns controlled release execution and deployment validation.

Responsibilities:

- Deploys only after required gates pass.
- Validates deployment evidence.
- Checks service status and release health.
- Reports deployment success or failure clearly.

BroDeploy does not:

- Approve implementation.
- Approve QA.
- Change code during deployment.
- Bypass gates.

---

### BroDesign — UI/UX Designer / Design System Authority

BroDesign owns UX and design specifications.

Responsibilities:

- Defines user flows.
- Defines screens, components, states, and responsive behavior.
- Produces implementation-ready design specs.
- Defines accessibility and visual consistency requirements.

BroDesign does not:

- Define backend logic.
- Define database schemas.
- Override architecture.
- Change product scope.

---

### BroDocs — Documentation / Knowledge Management Agent

BroDocs owns documentation consistency and institutional memory.

Responsibilities:

- Maintains documentation quality.
- Records decisions, trade-offs, and retrospectives.
- Keeps artifacts aligned.
- Flags inconsistencies between PRD, architecture, stories, QA, and deployment notes.

BroDocs does not:

- Change product scope.
- Change architecture decisions.
- Invent missing facts.
- Approve implementation or QA.

---

## External / Out-of-Board Components

Some components may exist outside the Paperclip execution board and are not treated as standard downstream agents.

### BroStorm

BroStorm operates as a Studio-side ideation and brainstorming interface.

Role:

- Explores ideas.
- Helps shape early product direction.
- Supports project context generation before formal execution.

BroStorm is not a default Paperclip board execution agent.

---

### StudioBridge

StudioBridge is an adapter between Studio and Paperclip.

Role:

- Transfers structured context from Studio into Paperclip.
- Converts Studio output into project input.
- Helps initialize `PROJECT_CONTEXT.md` or equivalent intake artifacts.

StudioBridge does not own product decisions, architecture, implementation, QA, or deployment.

---

## Execution Flow

Default execution flow:

1. BroStorm / Studio produces initial context.
2. StudioBridge transfers structured context into Paperclip.
3. BroMaster creates or validates Project Context and PRD.
4. BroArchitect creates Architecture.
5. BroMaster creates Epics and Stories.
6. BroMaster and BroArchitect validate Implementation Readiness.
7. BroBuilder implements one ready story at a time.
8. BroReview performs technical review.
9. BroQA validates functional behavior when required.
10. BroDeploy releases only after gates pass.
11. BroDocs updates documentation and retrospective records.

Not every project requires every agent, but no implementation should start before the required artifacts and gates are satisfied.

---

## Delegation Model

Paperclip native `@mentions` are the default delegation mechanism.

BroMaster delegates using structured handoffs:

- target agent
- objective
- context
- constraints
- acceptance criteria
- expected output
- next step

API-level delegation is not the default workflow.

---

## Quality Gates

The company enforces the following gates:

1. Context Gate
2. PRD Gate
3. Architecture Gate
4. Story Readiness Gate
5. Technical Review Gate
6. QA Gate when required
7. Deploy Gate
8. Documentation / Retrospective Gate

A gate may only be bypassed by explicit user approval.

If a gate is bypassed, BroMaster must record:

- which gate was bypassed
- who approved it
- why it was approved
- risk accepted
- required follow-up mitigation

---

## Production and Deployment

Production branch:

- `main`

Deployment workflow:

- `.github/workflows/deploy.yml`

Deployment behavior:

- Deploy runs automatically on push to `main`.
- Deploy can also run manually through GitHub Actions.
- GitHub Actions accesses the server through Cloudflare Tunnel.
- Tunnel host: `deploy.cartolab.co`
- Server project path: `/projects/cartolab-paperclip`
- Main app host: `adm.cartolab.co`
- App backend target: `http://localhost:3100`

Server deploy sequence:

DEPLOY_SEQUENCE:
git fetch origin
git checkout main
git reset --hard origin/main
docker compose up -d --build
docker compose ps
END_DEPLOY_SEQUENCE

Concurrency:

- `production-deploy`

This prevents simultaneous production deploys.

Any change pushed to `main` must be treated as production-impacting.

---

## Infrastructure

- Server: `morezudos`
- Runtime: Linux + Docker
- Admin UI: `adm.cartolab.co`
- Deploy tunnel: `deploy.cartolab.co`
- Project path: `/projects/cartolab-paperclip`
- GitHub organization: `Cartola-Lab`

---

## Company Rules

- Artifacts are mandatory for durable project knowledge.
- BroMaster controls workflow, not implementation.
- BroArchitect controls architecture, not project scope.
- BroBuilder implements only ready stories.
- BroReview validates technical quality.
- BroQA validates functional behavior.
- BroDeploy releases only after gates pass.
- BroDocs preserves institutional memory.
- Paperclip issues are operational containers, not replacements for BMAD artifacts.
- Native `@mentions` are preferred for delegation.
- API-level orchestration is exceptional, not default.
- Production deploys are automatic from `main`.
