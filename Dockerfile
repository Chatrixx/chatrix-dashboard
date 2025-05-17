FROM node:22-slim AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci --no-update-notifier
COPY . .
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
RUN npm run build --no-update-notifier

FROM node:22-slim AS runner

WORKDIR /app
RUN addgroup --system nextjs && adduser --system --ingroup nextjs nextjs

COPY --from=builder --chown=nextjs:nextjs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nextjs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nextjs /app/public ./public

USER nextjs

ARG NODE_ENV
ENV NODE_ENV=$NODE_ENV

ENV PORT=3000
ENV HOSTNAME=0.0.0.0
EXPOSE 3000

CMD ["node", "server.js"]
