# BMAD Agent Prompts

This folder contains the operational prompts for Cartolab's Paperclip agents.

These prompts must follow the BMAD operating model defined in:

- bmad/README.md
- bmad/templates/
- bmad/paperclip/

## Prompt design principles

- Keep prompts role-specific.
- Do not overload agents with unrelated responsibilities.
- BMAD artifacts are the source of truth.
- Paperclip is the operational control plane.
- Native @mentions are the default delegation mechanism.
- API-level delegation is not the default workflow.
- Implementation must not start before PRD, Architecture, Stories, and Readiness gates are satisfied.

## Folder convention

Each agent gets its own folder.

The prompt for each agent lives in that folder's README.md.

Example:

- bmad/agents/bromaster/README.md
- bmad/agents/broarchitect/README.md
- bmad/agents/brobuilder/README.md
- bmad/agents/brodeploy/README.md

Avoid flat prompt files directly under bmad/agents unless they are shared index or policy files.

## Agent prompt files

| Path | Agent | Role |
|---|---|---|
| bmad/agents/bromaster/README.md | BroMaster | Project Manager / Lead Orchestrator |
| bmad/agents/broarchitect/README.md | BroArchitect | Technical Architect / System Design Authority |
| bmad/agents/brobuilder/README.md | BroBuilder | Full Stack Developer / Implementation Agent |
| bmad/agents/brodeploy/README.md | BroDeploy | Release / Deployment Agent |

Additional prompts should be added here as agents are standardized.

## Production awareness

The repository deploys automatically from main.

Agents must treat pushes to main as production-impacting changes.

Deployment details live outside the prompt layer, but BroMaster and technical agents must know that production release is automated after main is updated.
