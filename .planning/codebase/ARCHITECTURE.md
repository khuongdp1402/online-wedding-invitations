# Architecture

Overview of the system design and architectural patterns.

## Application Pattern
- **Next.js App Router**: Utilizes React Server Components (RSC) for data fetching and Client Components for interactivity.
- **Monorepo-lite Structure**: All logic (frontend and backend) resides in a single repository.

## Layers
1. **Routing Layer (`app/`)**: Handles URL routing, layout management, and API endpoints. 
    - `/dashboard`: User management area.
    - `/w/[slug]`: Dynamic public wedding pages based on Prisma slugs.
    - `/auth`: Authentication flows.
2. **UI Layer (`components/`)**:
    - **UI Primitives**: Atomic components using Shadcn/UI standards.
    - **Business Components**: Domain-specific UI (e.g., `WeddingCard`, `RSVPForm`).
    - **Invitation Templates**: Specialized components in `components/templates/` that render the actual wedding site.
3. **Logic Layer (`lib/`)**:
    - Infrastructure clients (S3, Prisma+, Auth).
    - Business logic utilities (Payment calculation, file storage orchestration).
4. **Data Layer (`prisma/`)**:
    - Schema definitions, migrations, and seed data.

## Communication
- **Client to Server**: Next.js Server Actions and Route Handlers (API).
- **Server to External**: 
    - Prisma → PostgreSQL.
    - S3 SDK → MinIO.
    - HTTP → VNPAY/Resend.

## Core Flows
- **Wedding Creation**: User selects template → database entry created → default configuration applied via `TemplateRegistry`.
- **Media Management**: 3-step upload flow (Get Presigned URL → Upload to S3/MinIO → Save metadata to Prisma).
- **Payment Flow**: Initiate via `Payment` model → Redirect to VNPAY → Callback handler confirms status → Update `Wedding` plan.
