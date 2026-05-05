# Code Review Template

## Artifact metadata

- Story ID:
- Epic ID:
- Project:
- Owner: BroReview
- Status: Not started | Passed | Failed | Needs revision
- Last updated:

## Review purpose

Validate that implementation satisfies the story while respecting architecture, maintainability, and quality expectations.

## Inputs reviewed

- Story file:
- Pull request / commit / diff:
- Architecture references:
- Acceptance criteria:

## Technical review checklist

### Architecture alignment

- Follows ARCHITECTURE.md: No
- Does not introduce unauthorized patterns: No
- Respects component boundaries: No

### Code quality

- Clear and maintainable: No
- Minimal unnecessary complexity: No
- Handles errors appropriately: No
- Avoids duplicated logic: No

### Security and data safety

- No secrets exposed: No
- Sensitive data handled correctly: No
- Permission boundaries respected: No

### Tests and verification

- Relevant tests added or updated: No
- Existing tests still pass: No
- Manual validation steps are clear: No

## Findings

| Severity | Finding | Required action |
|---|---|---|
| High |  |  |

## Decision

Status: PASSED | FAILED | NEEDS_REVISION

Reason:

## Required changes

- Change 1

## Handoff

If passed: send to BroQA when QA is required, otherwise send back to BroMaster.

If failed: return to BroBuilder with required changes.
