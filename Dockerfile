# Build stage
FROM node:20-bookworm-slim AS builder

WORKDIR /app

RUN apt-get update -y && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

COPY package.json package-lock.json* ./
# Copy prisma trước để postinstall (prisma generate) tìm thấy schema
COPY prisma ./prisma
RUN npm ci
COPY . .
# Next.js standalone cần có thư mục public (tạo nếu dự án chưa có)
RUN mkdir -p public
RUN npx prisma generate
RUN npm run build

# Production stage
FROM node:20-bookworm-slim AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN apt-get update -y && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
RUN mkdir -p /app/public/uploads && chown -R nextjs:nodejs /app/public/uploads
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/prisma ./prisma
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/@prisma ./node_modules/@prisma
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/prisma ./node_modules/prisma
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/bcryptjs ./node_modules/bcryptjs
COPY --from=builder --chown=nextjs:nodejs /app/scripts ./scripts
COPY --from=builder --chown=nextjs:nodejs /app/package.json ./package.json

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Đồng bộ schema: mặc định `migrate deploy` (an toàn). Chỉ dùng `db push` khi
# set PRISMA_USE_DB_PUSH=true (rủi ro mất dữ liệu). Sau đó seed rồi chạy server.js
CMD ["sh", "-c", "if [ \"$PRISMA_USE_DB_PUSH\" = \"true\" ]; then node node_modules/prisma/build/index.js db push --accept-data-loss --skip-generate; else node node_modules/prisma/build/index.js migrate deploy; fi && node scripts/seed-docker.cjs && node server.js"]
