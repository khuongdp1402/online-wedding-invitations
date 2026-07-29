# Review Checklist

## 1) Correctness
- Does the main flow work end-to-end?
- Any edge case that may crash or break logic?

## 2) Data and Security
- Is input validation sufficient?
- Any sensitive leak in logs or responses?
- Are ownership and authorization checks correct?

## 3) UX
- Are loading, error, and success states clear?
- Are user messages actionable?

## 4) Maintainability
- Are names and structure clear?
- Can any large logic be simplified safely?

## 5) Verification
- Are build/test/lint checks appropriate for the change?
- Is there a clear rerun/verify guide for the user?