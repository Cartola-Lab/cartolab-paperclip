# BMAD Projects Runtime

This folder contains the runtime structure for project-specific BMAD artifacts.

Templates and operating rules live under `bmad/templates`, `bmad/paperclip`, `bmad/runtime`, and `bmad/tests`.

Actual project artifacts should live under this folder when the project needs durable state.

## Purpose

The purpose of `bmad/projects` is to give every project a stable artifact home.

A Paperclip issue is an operational container.
A BMAD project folder is the durable project memory.

## Required project structure

Every formal project should use this structure:

PROJECT_FOLDER:
bmad/projects/<project-slug>/
  PROJECT_CONTEXT.md
  PRD.md
  ARCHITECTURE.md
  EPICS_AND_STORIES.md
  IMPLEMENTATION_READINESS.md
  SPRINT_STATUS.yaml
  stories/
  reviews/
  retrospectives/
END_PROJECT_FOLDER

## Project slug rules

Use a stable lowercase slug.

Examples:

- cartolab-plugin-studio
- datamigo
- prestadores-app
- clickbank
- ai-trade

Avoid spaces, accents, and temporary names.

## Source of truth rules

For a project with a folder under `bmad/projects`, project-specific artifacts override global templates.

Priority order:

1. Project-specific artifact in `bmad/projects/<project-slug>/`
2. Global template in `bmad/templates/`
3. Paperclip issue context
4. Chat context

Do not let chat context override project artifacts unless BroMaster explicitly records the update.

## Lifecycle

Project folders should be created when a request becomes a formal project, not for every casual idea.

A formal project usually has:

- clear business goal
- expected deliverable
- owner or requester
- need for architecture or implementation
- more than one execution step

## Project initialization

To initialize a project:

1. Create `bmad/projects/<project-slug>/`.
2. Copy the contents of `bmad/projects/_template/`.
3. Fill `PROJECT_CONTEXT.md` first.
4. Let BroMaster create or validate `PRD.md`.
5. Let BroArchitect create or validate `ARCHITECTURE.md`.
6. Let BroMaster create `EPICS_AND_STORIES.md`.
7. Complete `IMPLEMENTATION_READINESS.md`.
8. Track execution in `SPRINT_STATUS.yaml`.

## Runtime rule

BroBuilder must not implement project work unless the project has either:

- a ready story artifact under `stories/`, or
- an equivalent Paperclip story that satisfies the BMAD Definition of Ready.

## Relationship with Paperclip

Paperclip remains the operational control plane.

Use Paperclip for:

- issues
- assignments
- heartbeats
- agent status
- run tracking
- comments
- execution visibility

Use BMAD project folders for:

- durable requirements
- architecture
- stories
- readiness
- sprint status
- reviews
- retrospectives
- project memory

## Do not

- Do not use project folders as random scratchpads.
- Do not start implementation from an empty project folder.
- Do not keep stale artifacts without marking them stale.
- Do not close project work while `SPRINT_STATUS.yaml` disagrees with Paperclip status.
