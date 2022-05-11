# README.md is WIP

## Install

    yarn

## Run the app

    yarn start

# REST API

The REST API is described below.

## Get wallet token balances

### This will check balances against a list of contract addresses.

### Request

`GET /balances/{chain}/{address}`

```sh
curl GET 'Accept: application/json' http://0.0.0.0:8080/balances/polygon/0xBA12222222228d8Ba445958a75a0704d566BF2C8 | json_pp -json_opt pretty,canonical
```

### Response

```json
{
  "balances": [
    {
      "address": "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
      "balance": 5964,
      "decimals": 18,
      "name": "Ether",
      "symbol": "ETH"
    }
    // more balances
  ],
  "error": null
}
```

## GET wallet balance for a specific token

### Request

```sh
curl GET 'Accept: application/json' http://0.0.0.0:8080/balance/polygon/0xBA12222222228d8Ba445958a75a0704d566BF2C8?token=0xd6df932a45c0f255f85145f286ea0b292b21c90b | json_pp -json_opt pretty,canonical
```

### Response

```json
{
  "balances": [
    {
      "address": "0xd6df932a45c0f255f85145f286ea0b292b21c90b",
      "balance": 16192,
      "decimals": 18,
      "name": "Aave",
      "symbol": "AAVE"
    }
  ],
  "error": null
}
```

## Get wallet balances for a specific list of tokens

### Request

`POST /balances/{chain}/{address}`

```sh
curl POST '0.0.0.0:8080/balances/ethereum/0x72a53cdbbcc1b9efa39c834a540550e23463aacb' \
--header 'Content-Type: application/json' \
--data-raw '[
    "0x95ad61b0a150d79219dcf64e1e6cc01f0b64c4ce",
    "0xff20817765cb7f73d4bde2e66e067e58d11095c2",
    "0x8290333cef9e6d528dd5618fb97a76f268f3edd4",
    "0x18aaa7115705e8be94bffebde57af9bfc265b998"
]' | json_pp -json_opt pretty, canonical
```

### Response

```json
{
  "balances": [
    {
      "address": "0x95ad61b0a150d79219dcf64e1e6cc01f0b64c4ce",
      "balance": 33493211412782,
      "decimals": 18,
      "name": "Shiba Inu",
      "symbol": "SHIB"
    },
    {
      "address": "0xff20817765cb7f73d4bde2e66e067e58d11095c2",
      "balance": 99315974,
      "decimals": 18,
      "name": "Amp",
      "symbol": "AMP"
    },
    {
      "address": "0x8290333cef9e6d528dd5618fb97a76f268f3edd4",
      "balance": 40229376,
      "decimals": 18,
      "name": "Ankr",
      "symbol": "ANKR"
    },
    {
      "address": "0x18aaa7115705e8be94bffebde57af9bfc265b998",
      "balance": 1878640,
      "decimals": 18,
      "name": "Audius",
      "symbol": "AUDIO"
    }
  ],
  "error": null
}
```

## Ping

### Request

`GET /ping`

```sh
curl GET '0.0.0.0:8080/ping'
```

### Response

```json
{ "ping": "pong" }
```