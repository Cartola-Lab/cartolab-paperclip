# BMAD Paperclip Contracts

This folder defines the operational contracts that allow BMAD to run inside Paperclip.

BMAD defines the method.
Paperclip provides the operational control plane.
Contracts define the exact handoff and gate language between agents.

## Purpose

Agent prompts describe roles.
Contracts define how work moves.

A role without a contract creates vague collaboration.
A contract turns collaboration into an auditable workflow.

## Contract files

| File | Purpose |
|---|---|
| AGENT_HANDOFF_CONTRACT.md | Defines official handoff formats between agents. |
| STORY_LIFECYCLE.md | Defines story states, transitions, owners, and gate requirements. |
| DEFINITION_OF_READY.md | Defines when a story is ready for implementation. |
| DEFINITION_OF_DONE.md | Defines when a story can be considered complete. |

## Operating rule

Agents should use these contracts when moving work between roles.

BroMaster enforces the contracts.
Specialized agents follow the contracts.
BroDocs preserves evidence and consistency.

## Source of truth priority

When a handoff or status is ambiguous, use this priority order:

1. Project-specific artifacts under `bmad/projects/<project-slug>/`
2. Contract files in this folder
3. Adapter rules under `bmad/paperclip/`
4. Agent prompt rules under `bmad/agents/`
5. Paperclip comments or issue context

## Contract enforcement

Work should be blocked when:

- handoff is incomplete
- status transition is invalid
- Definition of Ready is not satisfied
- Definition of Done is not satisfied
- required owner is missing
- evidence is missing

## Non-goal

These contracts do not replace project artifacts.
They define how project artifacts are exchanged and validated.
