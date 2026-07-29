# Project Structure

Overview of the directory organization and key file locations.

## Root Directory
- `.ai/`: Agent-specific rules and instructions.
- `.cursor/`: Cursor editor configurations.
- `.github/`: CI/CD workflows (GitHub Actions).
- `docs/`: Standards and technical documentation.
- `prisma/`: Database schema, migrations, and seed scripts.
- `public/`: Static assets (fonts, images, icons).
- `scripts/`: Maintenance and utility scripts.
- `templates/`: (Potentially) Template-specific configurations or assets.
- `types/`: Global TypeScript type definitions.

## Application Code (`app/`)
- `(marketing)/`: Group for public landing pages (Home, Templates, Pricing).
- `api/`: Server-side route handlers (Payments, Files, Webhooks).
- `auth/`: Custom authentication pages (Login, Register).
- `dashboard/`: Private user area (Wedding management, Profile).
- `w/[slug]/`: Dynamic public invitation routes.

## Components (`components/`)
- `dashboard/`: Complex UI for wedding editing and management.
- `marketing/`: Components for the landing page.
- `templates/`: Visual invitation templates (e.g., `autumn-watercolor`).
- `ui/`: Reusable primitive components (Shadcn/UI).

## Logic & Utilities (`lib/`)
- `auth.ts`: NextAuth configuration and helpers.
- `file-storage.ts`: High-level media management.
- `payment.ts`: Payment logic (VNPAY Integration).
- `prisma.ts`: Prisma client singleton.
- `s3-client.ts`: Low-level S3/MinIO client.
- `template-registry.ts`: Registry for wedding invitation themes.
- `utils.ts`: General-purpose helper functions.
