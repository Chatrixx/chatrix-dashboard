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

COPY --from=builder --chown=nextjs:nextjs /app/.next ./.next
COPY --from=builder --chown=nextjs:nextjs /app/public ./public
COPY --from=builder --chown=nextjs:nextjs /app/package.json ./package.json
COPY --from=builder --chown=nextjs:nextjs /app/package-lock.json ./package-lock.json

RUN npm ci --omit=dev --no-update-notifier --ignore-scripts


USER nextjs

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

EXPOSE 3000

CMD ["node", ".next/standalone/server.js"]
