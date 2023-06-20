# 🚧 WIP 🚧

## <h1 align="center"> Multicoin Balances Smart Contract and REST server</h1>

This is like `balanceOf` but for multiple coins. It takes 2 inputs, a wallet address and an array of coin addresses. It returns an array of balances for each coin. The first element of the array is the wallet balance of the native coin of the chain.

For contract code, see [./packages/core/src/Balances.sol](./packages/core/src/BalancesOf.sol).

For usage example, see the [./packages/core/example/balances.ts](./example/balances.ts).

For REST server, see [./apps/api](./apps/api).

## Deployed Contracts

| Network | Address |
| --- | --- |
| Ethereum | [0x13675852Ac733AEd5679985778BE5c18E64E97FA](https://etherscan.io/address/0x13675852Ac733AEd5679985778BE5c18E64E97FA#code) |
| Arbitrum | [0x77e883446e4cDE8955b4ce07DfCf0E9887B0e66c](https://arbiscan.io/address/0x77e883446e4cDE8955b4ce07DfCf0E9887B0e66c#code) |
| Optimism | [0xc9ba77c9b27481b6789840a7c3128d4f691f8296](https://optimistic.etherscan.io/address/0xc9ba77c9b27481b6789840a7c3128d4f691f8296#code) |
| Polygon | [0x8b08FE6F8443f7bBbEde50Ecc8B020d9e44997a2](https://polygonscan.com/address/0x8b08FE6F8443f7bBbEde50Ecc8B020d9e44997a2#code) |
| Avalanche | [0xc9bA77C9b27481B6789840A7C3128D4f691f8296](https://snowtrace.io/address/0xc9ba77c9b27481b6789840a7c3128d4f691f8296#code) |
| Celo | [0x5D88da6682B9088B9e31c900Be850de20cF20B11](https://celoscan.io/address/0x5d88da6682b9088b9e31c900be850de20cf20b11#code) |
| Gnosis | [0x5D88da6682B9088B9e31c900Be850de20cF20B11](https://gnosisscan.io/address/0x5d88da6682b9088b9e31c900be850de20cf20b11#code) |
| Harmony One | [0xc9bA77C9b27481B6789840A7C3128D4f691f8296](https://explorer.harmony.one/address/0xc9ba77c9b27481b6789840a7c3128d4f691f8296#code) |
| Moonbeam | [0x5D88da6682B9088B9e31c900Be850de20cF20B11](https://moonbeam-explorer.netlify.app/address/0x5d88da6682b9088b9e31c900be850de20cf20b11#code) |
| Fantom | [0xc9bA77C9b27481B6789840A7C3128D4f691f8296](https://ftmscan.com/address/0xc9ba77c9b27481b6789840a7c3128d4f691f8296#code) |
| BSC | [0xc9bA77C9b27481B6789840A7C3128D4f691f8296](https://bscscan.com/address/0xc9ba77c9b27481b6789840a7c3128d4f691f8296#code) |
| Aurora | [0xc9bA77C9b27481B6789840A7C3128D4f691f8296](https://explorer.aurora.dev/address/0xc9bA77C9b27481B6789840A7C3128D4f691f8296) |
| Goerli | [0x694be3BCecAf1dD69ba91D21c54E22C87882a595](https://goerli.etherscan.io/address/0x694be3BCecAf1dD69ba91D21c54E22C87882a595#code) |
| Sepolia | [0x5D88da6682B9088B9e31c900Be850de20cF20B11](https://sepolia.etherscan.io/address/0x5D88da6682B9088B9e31c900Be850de20cF20B11#code) |
| Polygon Mumbai | [0x5D88da6682B9088B9e31c900Be850de20cF20B11](https://mumbai.polygonscan.com/address/0x5D88da6682B9088B9e31c900Be850de20cF20B11#code) |
| Optimism Goerli | [0x5D88da6682B9088B9e31c900Be850de20cF20B11](https://goerli-optimism.etherscan.io/address/0x5d88da6682b9088b9e31c900be850de20cf20b11#code) |
| Arbitrum Goerli | [0xc9bA77C9b27481B6789840A7C3128D4f691f8296](https://goerli.arbiscan.io/address/0xc9ba77c9b27481b6789840a7c3128d4f691f8296#code) |
| Fantom Testnet | [0xc9bA77C9b27481B6789840A7C3128D4f691f8296](https://testnet.ftmscan.com/address/0xc9ba77c9b27481b6789840a7c3128d4f691f8296#code) |
| Base Goerli | [0x4a54047B53C5B011b00AcBdec84c090e6Cc175E2](https://goerli.basescan.org/address/0x4a54047b53c5b011b00acbdec84c090e6cc175e2#code) |

```jsonc
{
 "ethereum": "0x13675852Ac733AEd5679985778BE5c18E64E97FA",
 "arbitrum": "0x77e883446e4cDE8955b4ce07DfCf0E9887B0e66c",
 "optimism": "0xc9bA77C9b27481B6789840A7C3128D4f691f8296",
 "polygon": "0x8b08FE6F8443f7bBbEde50Ecc8B020d9e44997a2",
 "celo": "0x5D88da6682B9088B9e31c900Be850de20cF20B11",
 "gnosis": "0x5D88da6682B9088B9e31c900Be850de20cF20B11",
 "harmonyOne": "0xc9bA77C9b27481B6789840A7C3128D4f691f8296",
 "moonbeam": "0x5D88da6682B9088B9e31c900Be850de20cF20B11",
 "avalanche": "0xc9bA77C9b27481B6789840A7C3128D4f691f8296",
 "fantom": "0xc9bA77C9b27481B6789840A7C3128D4f691f8296",
 "bsc": "0xc9bA77C9b27481B6789840A7C3128D4f691f8296",
 "aurora": "0xc9bA77C9b27481B6789840A7C3128D4f691f8296",
 "goerli": "0x694be3BCecAf1dD69ba91D21c54E22C87882a595",
 "sepolia": "0x5D88da6682B9088B9e31c900Be850de20cF20B11",
 "polygonMumbai": "0x5D88da6682B9088B9e31c900Be850de20cF20B11",
 "optimismGoerli": "0x5D88da6682B9088B9e31c900Be850de20cF20B11",
 "arbitrumGoerli": "0xc9bA77C9b27481B6789840A7C3128D4f691f8296",
 "fantomTestnet": "0xc9bA77C9b27481B6789840A7C3128D4f691f8296",
 "avalancheFuji": "0xc9bA77C9b27481B6789840A7C3128D4f691f8296",
 "baseGoerli": "0x4a54047B53C5B011b00AcBdec84c090e6Cc175E2"
}

```
