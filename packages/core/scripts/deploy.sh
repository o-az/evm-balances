#!/usr/bin/env bash

set -eoux pipefail

forge create --rpc-url http://127.0.0.1:8545 \
  --private-key $KEY \
  src/BalancesOf.sol:BalancesOf
