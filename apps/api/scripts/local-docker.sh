#!/usr/bin/env bash

set -euox pipefail

# build
#
docker buildx build \
  . --no-cache \
  --progress=plain \
  --file ./Dockerfile \
  --tag evm-balances

# run
#
docker run \
  -it \
  --rm \
  --detach \
  --publish 3033:3033 \
  --env 'NODE_ENV=production' \
  --env 'INFURA_KEY=$INFURA_KEY' \
  --env 'LLAMANODES_API_KEY=$LLAMANODES_API_KEY' \
  --env 'ANKR_API_KEY=$ANKR_API_KEY' \
  --env 'SENTRY_DSN=$SENTRY_DSN' \
  --name evm-balances \
  evm-balances
