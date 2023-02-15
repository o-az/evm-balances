import { type Chain } from '@/types';

export const POSSIBLE_CHAIN_NAMES = [
  'polygon',
  'polygon-mainnet',
  'polygon-testnet',
  'polygonTest',
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
  'optimism-mainnet',
  'optimism',
  'opera',
  'fantom',
  'fantom-mainnet',
  'arbitrum',
  'arbitrum-mainnet',
  'avalanche-mainnet',
  'avalanche-testnet',
  'avalancheTest',
  'avalanche-fuji',
  'avalanceFuji',
  '1',
  '56',
  '3',
  '4',
  '97',
  '431',
  '800',
  '250',
  '421',
  '137',
  '10',
]; //as const

export type PossibleChainNames = (typeof POSSIBLE_CHAIN_NAMES)[number];

export const networkUrl = ({
  chain,
  infuraKey,
  alchemyKey,
}: {
  chain: PossibleChainNames | Chain;
  infuraKey?: string;
  alchemyKey?: string;
}) => {
  switch (chain) {
    case 'opera':
    case 'fantom':
    case '250': {
      return 'https://rpcapi.fantom.network';
    }
    case 'avalanche':
    case 'avalanche-mainnet':
    case '43114': {
      return 'https://api.avax.network/ext/bc/C/rpc';
    }
    case 'avalanche-testnet':
    case 'avalanceFuji':
    case 'avalanche-fuji':
    case 'avalancheTest':
    case '43113': {
      return 'https://api.avax-test.network/ext/bc/C/rpc';
    }
    case 'bsc':
    case 'bsc-mainnet':
    case 'smartchain':
    case '56': {
      return 'https://bsc-dataseed1.binance.org';
    }
    case 'bsctestnet':
    case 'bsc-testnet':
    case 'smartchain-testnet':
    case '97': {
      return 'https://data-seed-prebsc-2-s3.binance.org:8545/';
    }
    case 'polygon':
    case 'polygon-mainnet':
    case '137': {
      return `https://polygon-mainnet.infura.io/v3/${infuraKey}`;
    }
    case 'polygon-testnet':
    case 'polygonTest':
    case 'polygon-mumbai':
    case '80001': {
      return `https://polygon-testnet.infura.io/v3/${infuraKey}`;
    }
    case 'ethereum':
    case 'ethereum-mainnet':
    case 'mainnet':
    case '1': {
      return `https://mainnet.infura.io/v3/${infuraKey}`;
    }
    default: {
      return `https://${chain}-mainnet.infura.io/v3/${infuraKey}`;
    }
  }
};

export function mapChain(chain: PossibleChainNames): Chain {
  switch (chain) {
    case 'polygon':
    case 'polygon-mainnet':
    case 'polygon-testnet':
    case 'polygon-mumbai':
    case '137': {
      return 'polygon';
    }
    case 'ethereum':
    case 'mainnet':
    case '1':
    case 'ethereum-mainnet': {
      return 'ethereum';
    }
    case 'ethereum-testnet':
    case 'ropsten':
    case '3': {
      return 'ropsten';
    }
    case 'rinkeby':
    case '4': {
      return 'rinkeby';
    }
    case 'avalanche':
    case 'avalanche-mainnet':
    case '43114': {
      return 'avalanche';
    }
    case 'bsc':
    case 'bsc-mainnet':
    case 'smartchain':
    case 'bsctestnet':
    case 'bsc-testnet':
    case 'smartchain-testnet':
    case '56':
    case '97': {
      return 'bsc';
    }
    case 'optimism':
    case 'optimism-mainnet': {
      return 'optimism';
    }
    case 'arbitrum':
    case 'arbitrum-mainnet': {
      return 'arbitrum';
    }
    case 'fantom':
    case 'opera':
    case 'fantom-mainnet':
    case '250': {
      return 'fantom';
    }
    default: {
      throw new Error(
        `Unknown chain: "${chain}". Please use one of the following: [ ${POSSIBLE_CHAIN_NAMES.join(
          ', '
        )} ]`
      );
    }
  }
}
