# syntax=docker/dockerfile:1
# Multi-stage build: heavy tooling stays in early stages, the final image only
# carries the compiled app.

# ---- 1. install dependencies (cached until package*.json changes) ----
FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# ---- 2. build the app ----
FROM node:22-alpine AS build
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# next.config.ts reads API_ORIGIN while building (rewrites are baked into the build).
# In production nginx sends /api/ straight to the API container, so this is only the
# fallback target for /api requests that ever reach Next itself.
ARG API_ORIGIN=http://batchpilot-api:8000
ENV API_ORIGIN=$API_ORIGIN
RUN npm run build

# ---- 3. runtime image ----
FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0

# Never run as root inside the container.
RUN addgroup -S -g 1001 nodejs && adduser -S -u 1001 -G nodejs nextjs

COPY --from=build --chown=nextjs:nodejs /app/public ./public
COPY --from=build --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=build --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD wget -qO- http://127.0.0.1:3000/ >/dev/null || exit 1

CMD ["node", "server.js"]
