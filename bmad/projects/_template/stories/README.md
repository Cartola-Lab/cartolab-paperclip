# Stories

This folder contains project-specific implementation stories.

Each story should be created from the BMAD story template and must satisfy the Definition of Ready before BroBuilder receives it.

## File naming

Use stable story IDs:

- STORY-001.md
- STORY-002.md
- STORY-003.md

## Story rules

A story must include:

- story ID
- epic ID
- user story or system story
- context
- requirements covered
- architecture references
- acceptance criteria
- dependencies
- expected output
- verification method
- handoff path

## Lifecycle

Stories move through:

planned -> ready -> assigned -> in_progress -> review -> qa -> ready_for_deploy -> done

A story may become blocked at any point when required context, evidence, or gates are missing.

## Implementation rule

BroBuilder may only implement stories marked as ready or explicitly routed by BroMaster after readiness is satisfied.
