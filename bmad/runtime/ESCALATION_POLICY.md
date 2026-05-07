# Escalation Policy

## Purpose

This runtime policy defines when agents must escalate instead of guessing, improvising, or silently continuing.

Escalation is not failure.
Escalation is controlled risk management.

## Core rule

If a decision affects product scope, architecture, security, data, deployment, or user expectations and the answer is not documented, escalate.

## Escalation owners

| Issue type | Escalate to |
|---|---|
| Missing business logic | BroMaster / User |
| Missing PRD decision | BroMaster |
| Missing architecture decision | BroArchitect via BroMaster |
| Missing UX decision | BroDesign via BroMaster |
| Implementation blocker | BroMaster, then relevant specialist |
| Technical quality dispute | BroReview / BroArchitect via BroMaster |
| Functional behavior ambiguity | BroQA / BroMaster / User |
| Deployment risk | BroDeploy / BroMaster |
| Documentation conflict | BroDocs / BroMaster |
| Security or sensitive data concern | BroArchitect / BroMaster / User |

## Escalation triggers

Agents must escalate when:

- required artifact is missing
- acceptance criteria are ambiguous
- architecture conflicts with implementation needs
- data model is unclear
- integration behavior is unknown
- credentials, secrets, or permissions are missing
- user-facing behavior is unclear
- QA cannot reproduce expected behavior
- deployment evidence is missing
- production risk is meaningful
- two artifacts contradict each other
- agent responsibility is unclear

## Escalation levels

### Level 1: Agent-level blocker

Use when a specialized agent is missing information but the owner is clear.

Example:

BroBuilder blocks because a story lacks verification method.

### Level 2: BroMaster orchestration escalation

Use when ownership, sequence, scope, or gate status is unclear.

Example:

BroReview finds implementation that does not match the story and architecture is ambiguous.

### Level 3: User decision escalation

Use when the missing decision is business, product, budget, timeline, or risk acceptance.

Example:

The project can be implemented faster by skipping QA, but that increases production risk.

## Escalation format

ESCALATION_REQUEST:

Level:
1 | 2 | 3

Raised By:
[Agent]

Issue:
[What is unclear or unsafe]

Current Artifact or State:
[Relevant file, story, status, or issue]

Evidence:
- [Evidence 1]

Risk if Not Resolved:
[What could go wrong]

Recommended Owner:
[BroMaster | BroArchitect | BroDesign | BroBuilder | BroReview | BroQA | BroDeploy | BroDocs | User]

Required Decision:
[Exact decision or input needed]

Blocked Work:
[What cannot proceed]
END_ESCALATION_REQUEST

## User escalation rules

Escalate to the user when:

- business logic cannot be inferred
- scope trade-off affects value or timeline
- security risk requires acceptance
- deployment risk is meaningful
- data sensitivity is unclear
- requirement conflicts cannot be resolved by agents

Do not ask the user vague questions.

Ask for the smallest decision that unblocks the work.

## Escalation anti-patterns

Do not escalate because:

- the agent did not read the artifact
- the agent wants permission for normal role work
- the question is already answered in BMAD artifacts
- the agent wants to avoid making a clear technical decision within its authority

Do escalate when guessing would create rework or production risk.

## Escalation closure

An escalation is closed when:

- required decision is provided
- owner is assigned
- affected artifact is updated
- blocked work has a next state
- SPRINT_STATUS.yaml reflects the resolved status when applicable

## Principle

Escalate early when uncertainty is expensive.
Do not escalate routine execution.
