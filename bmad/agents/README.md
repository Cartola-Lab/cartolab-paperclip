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

## Agent prompt files

| File | Agent | Role |
|---|---|---|
| BROMASTER.md | BroMaster | Project Manager / Lead Orchestrator |

Additional prompts should be added here as agents are standardized.

## Production awareness

The repository deploys automatically from main.

Agents must treat pushes to main as production-impacting changes.

Deployment details live outside the prompt layer, but BroMaster must know that production release is automated after main is updated.
