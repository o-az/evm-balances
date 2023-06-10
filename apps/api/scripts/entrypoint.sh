#!/usr/bin/env bash

set -euox pipefail

echo "Running entrypoint.sh"

#
# this will allow the CMD in Dockerfile to be executed
exec "$@"