---
name: code-review-standard
description: Review code changes with severity-first format, focusing on bugs, regressions, security, data integrity, and missing tests. Use when user asks for code review or quality audit.
---

# Code Review Standard

## Goal

Produce actionable findings prioritized by impact.

## Workflow

1. Read full diff in business-flow order.
2. Classify findings: Critical > High > Medium > Low.
3. For each finding include location, issue, impact, and fix idea.
4. End with residual risks and targeted tests.

## Output shape

- **Critical**: `<file/symbol>` - issue and impact.
- **High**: `<file/symbol>` - issue and impact.
- **Medium/Low**: same format.

If no critical issue exists, state that explicitly.