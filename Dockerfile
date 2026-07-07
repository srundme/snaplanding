FROM node:22-bookworm-slim

WORKDIR /app

RUN apt-get update \
  && apt-get install -y --no-install-recommends ca-certificates \
  && rm -rf /var/lib/apt/lists/* \
  && npm install -g npm@11.6.2

COPY package.json package-lock.json ./
RUN npm ci --include=optional

COPY . .

ARG VITE_META_PIXEL_ID=985387470976266
ENV VITE_META_PIXEL_ID=$VITE_META_PIXEL_ID

ARG VITE_GOOGLE_ADS_ID=AW-18305222030
ENV VITE_GOOGLE_ADS_ID=$VITE_GOOGLE_ADS_ID

RUN npm run build && npm prune --omit=dev

ENV NODE_ENV=production
ENV HOST=0.0.0.0

EXPOSE 3000

CMD ["npm", "start"]
