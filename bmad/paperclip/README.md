# Paperclip Adapter for Cartolab BMAD

This folder defines how the Cartolab BMAD operating model is executed inside Paperclip.

BMAD defines the delivery method.
Paperclip provides the operational control plane.

Do not mix these responsibilities.

## Responsibility split

| Layer | Responsibility |
|---|---|
| BMAD Core | Defines artifacts, workflow sequence, readiness, story execution, and review gates. |
| Paperclip Adapter | Defines agent routing, native mentions, issue status mapping, and operational gates inside Paperclip. |

## Core rule

Paperclip issues, subtasks, comments, and mentions are execution mechanics.

BMAD artifacts remain the source of truth.

An issue is not ready for implementation just because it exists in Paperclip.
A story is ready only when the required BMAD artifacts and readiness gates are satisfied.

## Adapter files

| File | Purpose |
|---|---|
| AGENT_ROUTING.md | Defines which agent owns each BMAD responsibility. |
| MENTION_DELEGATION.md | Defines how BroMaster delegates using Paperclip native @mentions. |
| STATUS_MAPPING.md | Maps BMAD execution states to Paperclip issue/status behavior. |
| WORKFLOW_GATES.md | Defines required gates before planning, implementation, review, QA, and deploy. |

## Default Paperclip flow

1. User / Studio creates context.
2. StudioBridge brings context into Paperclip.
3. BroMaster checks BMAD artifact state.
4. BroMaster delegates using native @mentions.
5. Specialized agents produce or update artifacts.
6. BroMaster updates execution status.
7. Stories move through review, QA, and deploy gates.

## Native mentions over API-first delegation

Use Paperclip native @mentions for agent delegation unless the user explicitly requests API-level automation.

The default delegation mechanism is:

@AgentName

with structured objective, context, constraints, acceptance criteria, expected output, and next step.

API calls are not the default BMAD execution mechanism.
