# Project Bootstrap

## Purpose

This runtime rule defines how a new formal project starts in the Cartolab BMAD system.

A project should not begin with implementation.
A project begins with structured context and artifact creation.

## When to bootstrap a project

Bootstrap a project when the request has at least one of these traits:

- more than one implementation step
- requires architecture or integration decisions
- affects production behavior
- requires durable project memory
- involves multiple agents
- has business or technical risk
- needs review, QA, or deployment

Do not bootstrap a formal project for quick notes, trivial questions, or isolated clarification requests.

## Bootstrap owner

BroMaster owns project bootstrap.

StudioBridge may provide initial context.
BroStorm may provide discovery input.
BroDocs may assist with artifact organization.

## Required bootstrap outputs

A formal project bootstrap creates or identifies:

- project slug
- project folder under `bmad/projects/<project-slug>/`
- PROJECT_CONTEXT.md
- initial SPRINT_STATUS.yaml
- initial status in Paperclip
- open questions or blockers

## Bootstrap sequence

BOOTSTRAP_SEQUENCE:
1. Identify whether the request is a formal project.
2. Choose a stable project slug.
3. Create or locate `bmad/projects/<project-slug>/`.
4. Create PROJECT_CONTEXT.md from available context.
5. Identify missing business, product, technical, or design information.
6. Create or initialize SPRINT_STATUS.yaml.
7. Decide the next BMAD phase.
8. Route to BroMaster, BroArchitect, BroDesign, or BroDocs as needed.
END_BOOTSTRAP_SEQUENCE

## Project slug rules

Use lowercase kebab-case.

Good examples:

- cartolab-plugin-studio
- prestadores-app
- datamigo
- credit-policy-approval

Bad examples:

- New App
- test123
- client thing
- final-final-project

## Initial PROJECT_CONTEXT.md requirements

At bootstrap, PROJECT_CONTEXT.md should capture:

- original request
- business goal
- target users
- current pain
- proposed direction
- known constraints
- known integrations
- assumptions
- open questions

It may remain draft if information is missing.

## Bootstrap status rules

If PROJECT_CONTEXT.md is complete enough for PRD:

- status: context_ready
- next owner: BroMaster
- next artifact: PRD.md

If context is incomplete:

- status: blocked
- next owner: user or StudioBridge
- required action: provide missing context

## Initial SPRINT_STATUS.yaml requirements

At bootstrap, SPRINT_STATUS.yaml should include:

- project name
- project slug
- owner: BroMaster
- status: planning or blocked
- context_ready flag
- current_focus
- blockers if any
- activity log entry

## Bootstrap output format

When BroMaster completes bootstrap, use this structure:

PROJECT_BOOTSTRAP_RESULT:

Project:
[Project name]

Project Slug:
[project-slug]

Project Folder:
[path]

Current BMAD Phase:
context_needed | prd_needed | architecture_needed | stories_needed | readiness_check | blocked

Artifacts Created or Located:
- [artifact path]

Missing Information:
- [item or none]

Next Owner:
[BroMaster | BroArchitect | BroDesign | BroDocs | User]

Next Action:
[what must happen next]
END_PROJECT_BOOTSTRAP_RESULT

## Do not

- Do not create implementation tasks during bootstrap.
- Do not send work to BroBuilder during bootstrap.
- Do not invent missing business logic.
- Do not skip PRD when product requirements are unclear.
- Do not skip architecture when technical implementation is required.

## Emergency bootstrap

If the user explicitly requests speed over structure, BroMaster may create a lightweight bootstrap.

Even then, BroMaster must record:

- what structure was skipped
- who approved the shortcut
- accepted risk
- required follow-up artifact
