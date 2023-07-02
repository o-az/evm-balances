#!/usr/bin/env bash

set -eoux pipefail

forge build

bun ./scripts/json-to-ts.ts

bun run format ./abi/*.ts
