# Testing

Information about the testing strategy and tools.

## Tools
- **Vitest**: Modern testing framework for Vite/Next.js.
- **Node.js Test Runner**: (Optional/Alternative) potentially used for simple scripts.

## Test Types
- **Unit Tests**: Logic in `lib/` (e.g., date formatting, price calculation).
- **Smoke Tests**: Basic availability checks (e.g., `lib/smoke.test.ts`).
- **Database Integration**: Tests that interact with the Prisma client (local/test db).

## Execution
- Run all tests: `npm test` or `npm run test`.
- Coverage: (Check if coverage is configured in `vitest.config.ts`).

## Conventions
- Test files should be located alongside the code they test or in a `__tests__` directory.
- Suffix: `.test.ts` or `.spec.ts`.
