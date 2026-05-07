# Handoff Validation Tests

## Purpose

These tests validate whether agent handoffs satisfy the BMAD Agent Handoff Contract.

A handoff that lacks context, constraints, acceptance criteria, expected output, or next owner is invalid.

## Validation result format

HANDOFF_VALIDATION_RESULT:

Test ID:
[ID]

Status:
PASSED | FAILED | BLOCKED

Handoff Type:
[AGENT_DELEGATION | IMPLEMENTATION_HANDOFF | TECHNICAL_REVIEW_RESULT | QA_RESULT | DEPLOYMENT_RESULT | DOCS_UPDATE_RESULT | BLOCKED]

Evidence:
[Handoff content or issue link]

Missing Fields:
- [Field or none]

Required Fix:
[What must be corrected]
END_HANDOFF_VALIDATION_RESULT

---

# Test HANDOFF-001: Valid AGENT_DELEGATION

## Input

AGENT_DELEGATION:
@BroArchitect

Objective:
Create ARCHITECTURE.md for the project.

Context:
PRD.md is ready and architecture is required before stories.

Constraints:
- Do not implement code.
- Do not change product scope.

Acceptance Criteria:
- Stack is defined.
- Data flow is described.
- Technical constraints are actionable.

Expected Output:
ARCHITECTURE.md ready for BroMaster review.

Next Step:
BroMaster creates EPICS_AND_STORIES.md.

If Blocked:
Return missing information to BroMaster.
END_AGENT_DELEGATION

## Expected result

PASSED

---

# Test HANDOFF-002: Invalid delegation without mention

## Input

I will ask BroArchitect to create the architecture.

## Expected result

FAILED

## Reason

No native @mention and no structured handoff.

---

# Test HANDOFF-003: Invalid delegation without acceptance criteria

## Input

AGENT_DELEGATION:
@BroBuilder

Objective:
Build the dashboard.

Context:
The user wants a dashboard.

Expected Output:
Dashboard implementation.

Next Step:
Send to review.
END_AGENT_DELEGATION

## Expected result

FAILED

## Missing fields

- constraints
- acceptance criteria
- blocker handling instruction

---

# Test HANDOFF-004: Valid implementation handoff

## Input

IMPLEMENTATION_HANDOFF:

Story:
STORY-001 Dashboard filters

Summary:
Added date and status filters to dashboard.

Files Changed:
- ui/src/pages/Dashboard.tsx
- ui/src/components/FilterBar.tsx

Acceptance Criteria Coverage:
- User can filter by date: passed
- User can filter by status: passed

Verification Performed:
- pnpm test: passed
- manual UI smoke test: passed

Architecture Compliance:
Uses existing frontend state pattern and approved API endpoint.

Known Risks or Limitations:
- none

Next Step:
@BroReview should perform technical review.
END_IMPLEMENTATION_HANDOFF

## Expected result

PASSED

---

# Test HANDOFF-005: Invalid implementation handoff without evidence

## Input

IMPLEMENTATION_HANDOFF:

Story:
STORY-001 Dashboard filters

Summary:
Done.

Files Changed:
- not listed

Next Step:
@BroReview should review.
END_IMPLEMENTATION_HANDOFF

## Expected result

FAILED

## Missing fields

- real changed files
- acceptance criteria coverage
- verification performed
- architecture compliance

---

# Test HANDOFF-006: Valid technical review result

## Input

TECHNICAL_REVIEW_RESULT:

Story:
STORY-001 Dashboard filters

Status:
PASSED

Summary:
Implementation matches story and architecture.

Acceptance Criteria Review:
- User can filter by date: passed
- User can filter by status: passed

Architecture Alignment:
Aligned

Code Quality Notes:
- Code follows existing component patterns.

Verification Evidence:
- pnpm test: accepted

Findings:
- Severity: minor
  Finding: none
  Required Action: none

Decision:
Pass technical review.

Next Step:
@BroQA for functional validation
END_TECHNICAL_REVIEW_RESULT

## Expected result

PASSED

---

# Test HANDOFF-007: Invalid QA result without acceptance validation

## Input

QA_RESULT:

Story:
STORY-001 Dashboard filters

Status:
PASSED

Summary:
Looks good.

Next Step:
BroMaster for deploy decision
END_QA_RESULT

## Expected result

FAILED

## Missing fields

- acceptance criteria validation
- flows tested
- evidence

---

# Test HANDOFF-008: Valid blocked report

## Input

BLOCKED:
Reason:
Architecture is missing for payment integration.

Missing Input or Evidence:
- ARCHITECTURE.md payment integration section
- API authentication requirements

Risk if guessed:
Incorrect payment flow could create security and reconciliation issues.

Required Owner:
BroArchitect

Required Next Action:
Define integration boundaries and security constraints.
END_BLOCKED

## Expected result

PASSED

---

# Handoff validation checklist

A valid handoff should answer:

- Who is being asked to act?
- What must they do?
- Why is it needed?
- What constraints apply?
- How will success be judged?
- What evidence is expected?
- Who gets it next?
- What happens if blocked?
