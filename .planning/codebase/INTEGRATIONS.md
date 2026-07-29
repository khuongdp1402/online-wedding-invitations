# Integrations

External services and internal system integrations.

## Primary Integrations
- **PostgreSQL**: Managed via Prisma. Local development uses Docker.
- **S3 / MinIO**: 
    - Used for storing wedding images, gallery assets, and user uploads.
    - Configuration: `S3_ENDPOINT`, `S3_ACCESS_KEY_ID`, `S3_SECRET_ACCESS_KEY`.
    - Bucket: `wedding-uploads`.
- **NextAuth**:
    - Providers: Google OAuth (optional/configurable), Credentials (email/password).
    - Session management: JWT / Database persistence.
- **VNPAY**:
    - Payment gateway for premium plans.
    - Sandbox URL: `https://sandbox.vnpayment.vn/paymentv2/vpcpay.html`.
    - Return handler: `/api/payment/vnpay`.
- **Resend**:
    - Transactional email service (likely for verification, notifications, or receipts).

## Optional / Auxiliary Integrations
- **UploadThing**: Present in `package.json` and `.env.example`, potentially used as an alternative or specific file upload pipeline.
- **xlsx**: Used for importing/exporting guest lists in Excel format.

## Internal Clients (`lib/`)
- `prisma.ts`: Central database client.
- `s3-client.ts`: S3 client configured for MinIO.
- `upload-client.ts`: Logic for pre-signed URLs or direct uploads.
- `payment.ts`: Core payment logic and VNPAY integration.
