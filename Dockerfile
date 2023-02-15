# syntax=docker/dockerfile:labs
FROM node:lts-alpine AS builder

ARG PNPM_HOME="/root/.local/share/pnpm"
ARG PATH="${PATH}:${PNPM_HOME}"

WORKDIR /usr/src/app

COPY . /usr/src/app

# Install dependencies
RUN apk add --no-cache --update \
  bash \
  ca-certificates && \
  rm -rf /var/cache/apk/* && \
  npm install --global pnpm@latest && \
  pnpm install && \
  pnpm build

FROM node:lts-alpine

ARG NODE_ENV="production"

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app /usr/src/app

EXPOSE 8080

CMD [ \
  "node", \
  "--experimental-json-modules", \
  "--experimental-import-meta-resolve", \
  "--experimental-specifier-resolution=node", \
  "dist/index.js" \
  ]