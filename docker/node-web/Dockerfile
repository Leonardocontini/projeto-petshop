FROM node:25-alpine AS deps

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

FROM node:25-alpine AS runtime

ENV NODE_ENV=production
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY package*.json ./
COPY _web.js command.js ./
COPY app ./app
COPY bootstrap ./bootstrap
COPY database ./database
COPY docs ./docs
COPY public ./public
COPY routes ./routes
COPY storage ./storage
COPY docker/node-web/entrypoint.sh ./entrypoint.sh

RUN chmod +x ./entrypoint.sh \
    && mkdir -p storage/users storage/logs \
    && chown -R node:node /app

USER node

ENTRYPOINT ["./entrypoint.sh"]
CMD ["node", "_web.js"]
