# Code Style (Project)

## TypeScript and React

- Keep explicit types at boundaries (API, props, payload).
- Avoid `any`; if unavoidable, keep it narrow and local.
- Split large components by responsibility.
- Keep UI copy consistent.

## API and Server

- Validate input early and return correct status codes.
- Log errors with module prefix for traceability.
- Do not silently swallow errors unless intentionally fire-and-forget.

## Prisma and DB

- Schema changes must include rerun steps (`prisma generate`, `db push` or migrations).
- Keep query shape minimal using `select` and `include`.

## Docker

- Keep `docker compose up --build -d` healthy.
- Any port/env change must include updated access URL.