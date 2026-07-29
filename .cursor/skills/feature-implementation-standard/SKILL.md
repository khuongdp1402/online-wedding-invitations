---
name: feature-implementation-standard
description: Implement features with minimal-safe changes, docker-first verification, and clear delivery notes. Use when user asks to build or fix product features, APIs, forms, auth, Prisma, or Docker flows.
---

# Feature Implementation Standard

## Principles

- Make the smallest correct change first.
- Preserve Docker and production compatibility.
- Add short comments only for non-obvious logic.

## Workflow

1. Read directly related files first.
2. Implement in small focused steps.
3. Verify with `npm run build` or targeted checks.
4. Report: changed files, rationale, and verify steps.

## Delivery format

- What changed
- Why changed
- How to verify
- Remaining risks (if any)