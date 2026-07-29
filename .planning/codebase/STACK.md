# Tech Stack

Information about the core technologies, frameworks, and libraries used in this project.

## Core Frameworks
- **Next.js 14.2.35**: Main application framework (App Router).
- **React 18**: Frontend library.
- **TypeScript**: Type-safe development.

## Database & Persistence
- **Prisma 5.22.0**: ORM for database interactions.
- **PostgreSQL**: Primary database (configured in `schema.prisma`).
- **S3/MinIO**: Object storage for media files (weddings, gallery).

## Authentication
- **NextAuth.js v5 (Beta 30)**: Social login and credential-based authentication.
- **Bcryptjs**: Password hashing.

## Styling & UI Components
- **Tailwind CSS 3.4.1**: Utility-first CSS framework.
- **Radix UI**: Primitive UI components (via Shadcn/UI).
- **Framer Motion 12.33.0**: Smooth animations and transitions.
- **Lucide React**: Icon library.

## State Management & Utilities
- **Class Variance Authority (CVA)**: Type-safe CSS classes.
- **clsx / tailwind-merge**: Dynamic class generation.
- **date-fns**: Date manipulation.

## Integrations
- **Resend**: Email delivery.
- **VNPAY**: Payment gateway.
- **xlsx**: Excel data processing (guest lists).
- **UploadThing**: Alternative file upload service.

## Development Tools
- **Vitest**: Testing framework.
- **ESLint**: Linting and code quality.
- **Docker**: Containerization (via `Dockerfile` and `docker-compose.yml`).
