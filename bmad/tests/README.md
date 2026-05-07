# BMAD Tests

This folder contains behavioral and operational tests for the Cartolab BMAD system.

These tests are not unit tests for application code.
They are compliance tests for the software house operating model.

## Purpose

The purpose of BMAD tests is to verify that agents follow the expected workflow, gates, handoffs, and role boundaries.

A system with agents but no behavior tests will drift.
These tests help detect drift early.

## Test files

| File | Purpose |
|---|---|
| BMAD_COMPLIANCE_TESTS.md | Tests whether the overall BMAD process is followed. |
| AGENT_BEHAVIOR_TESTS.md | Tests whether each agent respects its role and boundaries. |
| HANDOFF_VALIDATION.md | Tests whether agent handoffs satisfy the required contract. |

## How to use

Run these tests manually through Paperclip issues or controlled agent heartbeats.

For each test:

1. Create a controlled Paperclip issue or run.
2. Provide the test input exactly or with minimal variation.
3. Observe the agent output.
4. Compare output against expected behavior.
5. Record pass/fail and evidence.
6. Update prompts, contracts, or runtime rules if repeated failures occur.

## Test result format

BMAD_TEST_RESULT:

Test ID:
[ID]

Agent or Flow:
[Agent / workflow tested]

Status:
PASSED | FAILED | BLOCKED

Evidence:
[Output, issue link, run id, or summary]

Failure Mode:
[If failed]

Required Fix:
[Prompt, contract, runtime, config, or artifact update]
END_BMAD_TEST_RESULT

## Testing principle

Agents should be tested against behavior, not vibes.

The system passes when agents consistently:

- respect artifacts as source of truth
- block unsafe work
- route to correct owners
- use structured handoffs
- enforce readiness and done gates
- avoid crossing role boundaries
