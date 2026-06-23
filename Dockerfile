FROM node:22-bookworm-slim

WORKDIR /app

RUN apt-get update \
  && apt-get install -y --no-install-recommends ca-certificates \
  && rm -rf /var/lib/apt/lists/*

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build && npm prune --omit=dev

ENV NODE_ENV=production
ENV HOST=0.0.0.0

EXPOSE 3000

CMD ["sh", "-c", "exec serve -s dist -l ${PORT:-3000}"]
