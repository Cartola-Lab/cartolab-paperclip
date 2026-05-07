# Definition of Ready

## Purpose

This contract defines when a story is ready to be assigned for implementation.

A story that is not ready must not be sent to BroBuilder.

## Core rule

A story is ready only when a qualified agent can implement it without inventing product scope, architecture, acceptance criteria, or verification method.

## Required artifacts

A ready story requires:

- PROJECT_CONTEXT.md exists or equivalent project context is available
- PRD.md exists and is ready
- ARCHITECTURE.md exists and is ready when technical implementation is required
- EPICS_AND_STORIES.md includes the story or related epic
- SPRINT_STATUS.yaml exists for formal project work
- story file exists or equivalent Paperclip story satisfies this contract

## Required story fields

A ready story must include:

- story ID
- epic ID or parent work item
- title
- user story or system story
- context
- requirements covered
- architecture references
- dependencies
- acceptance criteria
- expected output
- verification method
- owner agent
- next step after implementation

## Acceptance criteria requirements

Acceptance criteria must be:

- specific
- testable
- observable
- scoped to the story
- understandable by BroBuilder, BroReview, and BroQA

Invalid acceptance criteria:

- Make it better.
- Improve the UI.
- Fix the backend.
- Make it production ready.

Valid acceptance criteria:

- User can submit the form with valid data and receives a success message.
- API returns HTTP 400 with a clear error when required field is missing.
- Dashboard loads the last 30 days of data using the approved endpoint.

## Architecture readiness

If implementation affects code, infrastructure, data, auth, integrations, or runtime behavior, the story must reference architecture.

Architecture reference must include:

- relevant component or module
- data flow or integration boundary
- technical constraints
- forbidden patterns when relevant

If architecture is missing, route to BroArchitect before implementation.

## UX readiness

If implementation affects user interface or interaction, the story must include either:

- UX/design guidance, or
- explicit statement that existing UI patterns should be followed

If required UX behavior is unclear, route to BroDesign before implementation.

## Dependency readiness

Dependencies must be explicit.

Examples:

- depends on STORY-001
- depends on architecture decision
- depends on API token
- depends on user clarification
- depends on design spec

A story with unresolved critical dependencies is not ready.

## Verification readiness

A ready story must define how completion will be verified.

Examples:

- unit test
- typecheck
- build
- manual UI smoke test
- API request validation
- log inspection
- screenshot evidence

If verification cannot be run, the story must explain why and define acceptable evidence.

## Owner readiness

The owner agent must match the work:

- architecture -> BroArchitect
- UX/design -> BroDesign
- implementation -> BroBuilder
- technical review -> BroReview
- functional validation -> BroQA
- deployment -> BroDeploy
- documentation -> BroDocs

Do not assign implementation to BroBuilder when the real need is architecture, design, or clarification.

## Ready checklist

A story is ready when all are true:

- Product goal is understood
- Story is linked to a requirement or explicit user request
- Scope is clear
- Non-goals are clear enough to prevent drift
- Architecture reference exists when required
- UX guidance exists when required
- Dependencies are listed
- Acceptance criteria are testable
- Expected output is defined
- Verification method is defined
- Owner agent is correct
- Next step is defined

## Not ready examples

Not ready:

Build the dashboard.

Reason:
Missing scope, data source, architecture, acceptance criteria, and verification.

Not ready:

@BroBuilder implement authentication.

Reason:
Authentication requires product rules, architecture, security constraints, and acceptance criteria.

Not ready:

Make the screen beautiful.

Reason:
This is design work and requires BroDesign specification before implementation.

## Enforcement

BroMaster must not delegate not-ready stories to BroBuilder.

BroBuilder must block if assigned a not-ready story.

BroReview must fail review if implementation scope cannot be mapped to a ready story.
