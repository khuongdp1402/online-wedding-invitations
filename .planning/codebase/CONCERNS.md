# Concerns

Identified risks, technical debt, and potential issues within the codebase.

## Infrastructure & Configuration
- **S3 / MinIO Parity**: The project uses MinIO for local development. Ensuring identical configurations (CORS, Bucket Policies) in production S3 is critical.
- **Environment Variables**: Heavy reliance on `.env`. Missing variables for VNPAY or AWS will cause runtime failures in specific modules.

## Architecture
- **NextAuth Beta**: The use of `next-auth` version 5.0.0-beta.30 means the API is still subject to change and might have undocumented quirks.
- **Complex JSON Fields**: The `Wedding` model uses `Json` fields for `groomParents`, `brideParents`, `groomCeremony`, `gallery`, etc. Lack of strict Zod schema validation on these fields could lead to runtime errors if invalid data is saved.
- **Slug Collisions**: Slugs are unique, but the logic for generating them (likely from groom/bride names) needs robust collision handling to avoid user frustration.

## Security
- **Public Uploads**: `S3_PUBLIC_URL` implies assets are public. Sensitive wedding data (guest lists, bank info) must be handled with appropriate access controls if stored in the same bucket.
- **Admin API Key**: The use of a simple `ADMIN_API_KEY` for administrative tasks may be insufficient for multi-tenant or multi-admin scenarios.

## Development Experience
- **Database Seeding**: Large JSON configs in `seed.ts` make the file difficult to maintain. Consider moving template configs to separate JSON files.
