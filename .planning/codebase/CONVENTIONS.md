# Conventions

Coding standards, patterns, and best practices observed in this codebase.

## Development Workflow
- **Docker-First**: Use `docker compose` for local development (PostgreSQL, MinIO).
- **Prisma Migrations**: Use `npx prisma migrate dev` for schema changes.
- **Fast Delivery**: Small, valid changes with production safety (per `AGENTS.md`).

## Frontend Patterns
- **Tailwind CSS**: Primary styling method. Use `cn()` helper for dynamic classes.
- **Radix UI**: Basis for all interactive primitives.
- **Server Components**: Use for data fetching by default.
- **Client Components**: Restrict to interactive elements or hooks.
- **Lucide Icons**: Standard icon set.

## Backend & API
- **Type Safety**: Pervasive use of TypeScript across API routes and Server Actions.
- **Zod (Implicit)**: Likely used for schema validation (common in Shadcn/Next.js projects).
- **Service Layer**: Logic extracted into `lib/` modules (e.g., `payment.ts`, `file-storage.ts`).

## File Naming
- **Components**: PascalCase (e.g., `WeddingCard.tsx`).
- **Utilities/API**: kebab-case or camelCase (e.g., `s3-client.ts`, `auth.ts`).

## Linting & Formatting
- **ESLint**: Standard Next.js rules with TypeScript support.
- **Accessibility**: Radix UI primitives ensure basic ARIA compliance.
