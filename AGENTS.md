# Agent Playbook (Project)

This file defines default behavior for AI agents in this repository.

## Goals

- Fast delivery with production safety.
- Minimal blast radius for every change.
- Keep Docker-first workflow healthy.

## Working Rules

1. Understand request first, then implement the smallest valid change.
2. Validate with `npm run build` or targeted checks.
3. Report what changed, what remains, and how to verify.
4. Do not commit/push unless explicitly requested.

## Standards Docs

- `docs/standards/CODE_STYLE.md`
- `docs/standards/REVIEW_CHECKLIST.md`
- `docs/standards/DELIVERY_CHECKLIST.md`

## Project Skills

- `.cursor/skills/code-review-standard/SKILL.md`
- `.cursor/skills/feature-implementation-standard/SKILL.md`