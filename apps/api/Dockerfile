# # TODO: multi-stage build, first stage uses Node.js to build with tsup
# FROM node:lts-alpine AS builder

# WORKDIR /app

# RUN apk update && \
#   apk upgrade && \
#   apk add --no-cache cat jq \
#   && rm -rf /var/cache/apk/* && \
#   # deleting these two lines from package.json since they're from pnpm workspaces which bun doesn't support yet
#   # "eslint-config-base": "workspace:*",
#   # "tsconfig": "workspace:*",
#   jq --raw-output \
#   'del(.devDependencies["eslint-config-base"]) | del(.devDependencies["tsconfig"])' \
#   package.json > package.json.tmp && \
#   mv package.json.tmp package.json

# COPY . .

# RUN npm install 

FROM oven/bun

ARG PORT=3033
ENV PORT=$PORT
ENV APT_KEY_DONT_WARN_ON_DANGEROUS_USAGE=DontWarn

RUN apt-get update && export DEBIAN_FRONTEND=noninteractive && \
  apt-get --yes upgrade && \
  apt-get --yes install --no-install-recommends jq

WORKDIR /app

COPY . .

SHELL [ "/bin/bash", "-o", "pipefail", "-c" ]

RUN chmod -R 777 /app && \
  #
  # deleting these two lines from package.json since they're from pnpm workspaces which bun doesn't support yet
  # "eslint-config-base": "workspace:*",
  # "tsconfig": "workspace:*",
  jq --raw-output \
  'del(.devDependencies["eslint-config-base"]) | del(.devDependencies["tsconfig"])' \
  package.json > package.json.tmp && \
  mv package.json.tmp package.json && \
  #
  # bun install && \
  # node_modules/.bin/tsup --config ./tsup.config.ts
  bun install


EXPOSE $PORT

ENTRYPOINT [ "./scripts/entrypoint.sh" ]
CMD [ "bun", "run", "./src/index.ts" ]