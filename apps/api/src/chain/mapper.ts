import type { Chain } from '@/types'
/**
 * instead of requiring the end user to type 'polygon-mainnet' or 'polygon-mumbai',
 * we can allow them to type 'polygon' and have it automatically mapped to the correct chain
 * - polygon, polygon-mainnet                    -> polygon-mainnet
 * - polygon-testnet, polygon-mumbai             -> polygon-mumbai
 * - ethereum, mainnet, <empty_string>           -> ethereum
 * - ropsten, ethereum-testnet                   -> ropsten
 * - rinkeby                                     -> rinkeby
 * - avalanche                                   -> avalanche
 * - optimism, optimism-mainnet                  -> optimism
 * - arbitrum, arbitrum-mainnet                  -> arbitrum
 * - fantom, fantom-mainnet                      -> fantom-mainnet
 * - bsc, bsc-mainnet, smartchain                -> bsc
 * - bsctestnet, bsc-testnet, smartchain-testnet -> bsctestnet
 */

export const POSSIBLE_CHAIN_NAMES: Array<
  | Chain
  | 'polygon'
  | 'polygon-testnet'
  | 'mainnet'
  | 'ethereum-mainnet'
  | 'ethereum-testnet'
  | 'optimism-mainnet'
  | 'arbitrum-mainnet'
  | 'fantom-mainnet'
  | 'bsc-mainnet'
  | 'bsc-testnet'
  | 'smartchain'
  | 'smartchain-testnet'
> = [
  'polygon',
  'polygon-mainnet',
  'polygon-testnet',
  'polygon-mumbai',
  'mainnet',
  'ethereum',
  'ethereum-mainnet',
  'ethereum-testnet',
  'ropsten',
  'rinkeby',
  'avalanche',
  'bsc',
  'bsc-mainnet',
  'smartchain',
  'bsctestnet',
  'bsc-testnet',
  'smartchain-testnet',
  'optimism',
  'arbitrum',
  'fantom',
  'fantom-mainnet',
]

export type PossibleChainNames = typeof POSSIBLE_CHAIN_NAMES[number]

export function mapChain(chain: PossibleChainNames): Chain {
  switch (chain) {
    case 'polygon':
    case 'polygon-mainnet':
      return 'polygon-mainnet'
    case 'polygon-testnet':
    case 'polygon-mumbai':
      return 'polygon-mumbai'
    case 'ethereum':
    case 'mainnet':
    case 'ethereum-mainnet':
      return 'ethereum'
    case 'ethereum-testnet':
      return 'ropsten'
    case 'ropsten':
      return 'ropsten'
    case 'rinkeby':
      return 'rinkeby'
    case 'avalanche':
      return 'avalanche'
    case 'bsc':
    case 'bsc-mainnet':
    case 'smartchain':
      return 'bsc'
    case 'bsctestnet':
    case 'bsc-testnet':
    case 'smartchain-testnet':
      return 'bsctestnet'
    case 'optimism':
    case 'optimism-mainnet':
      return 'optimism'
    case 'arbitrum':
    case 'arbitrum-mainnet':
      return 'arbitrum'
    case 'fantom':
    case 'fantom-mainnet':
      return 'fantom'
    default:
      throw new Error(
        `Unknown chain: '${chain}'. Please use one of the following: [ ${POSSIBLE_CHAIN_NAMES.join(', ')} ]`
      )
  }
}
