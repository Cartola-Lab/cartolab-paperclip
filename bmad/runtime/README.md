# BMAD Runtime Operating Layer

This folder defines how the Cartolab BMAD system operates during real project execution.

Templates define artifact structure.
Contracts define handoff and gates.
Runtime rules define how the software house behaves under normal work, ambiguity, blockers, and failures.

## Purpose

The runtime layer turns BMAD from documentation into an operating system.

It tells agents:

- how projects start
- how work is orchestrated
- when to escalate
- how to recover from failure
- how to avoid unsafe improvisation

## Runtime files

| File | Purpose |
|---|---|
| PROJECT_BOOTSTRAP.md | Defines how a new formal project starts. |
| ORCHESTRATION_RULES.md | Defines how BroMaster controls multi-agent execution. |
| ESCALATION_POLICY.md | Defines when and how agents escalate decisions or blockers. |
| FAILURE_RECOVERY.md | Defines how to recover from failed runs, failed handoffs, failed review, failed QA, or failed deployment. |

## Runtime principles

- Artifacts are the source of truth.
- BroMaster controls workflow.
- Specialized agents own their domain only.
- A blocked state is safer than a guessed decision.
- Every handoff must include enough context to act.
- Every failure must produce evidence and next ownership.
- Project state must be recoverable after agent restarts.

## Source of truth priority

When runtime behavior is ambiguous, use this priority order:

1. Project-specific artifacts under `bmad/projects/<project-slug>/`
2. Runtime rules in this folder
3. Contracts under `bmad/paperclip/contracts/`
4. Adapter rules under `bmad/paperclip/`
5. Agent prompts under `bmad/agents/`
6. Paperclip issue context
7. Chat context

## Operational responsibility

BroMaster enforces runtime behavior.
BroDocs preserves runtime memory.
Specialized agents must follow the runtime rules and block when the rules cannot be satisfied.
