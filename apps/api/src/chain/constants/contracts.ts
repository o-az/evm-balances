import type { Chain, TestnetChain } from '@/types'

export const DEPLOYED_CONTRACTS: Record<Chain, string> = {
  bsc: '',
  bsctestnet: '0x7B1DB2CfCdd3DBd38d3700310CA3c76e94799081',
  ropsten: '0x1207602eBE2d77801081d57162577cbEf1414D78',
  ethereum: '',
  rinkeby: '0x7B1DB2CfCdd3DBd38d3700310CA3c76e94799081',
  avalanche: '',
  'polygon-mainnet': '0xE052Ef907f09c0053B237647aD7387D4BDF11A5A',
  'polygon-mumbai': '0xE052Ef907f09c0053B237647aD7387D4BDF11A5A',
  optimism: '',
  arbitrum: '',
  fantom: ''
}

export const DEPLOYED_TOKENS: {
  [chain in TestnetChain]: [string, ...string[]]
} = {
  ropsten: [
    '0x7B1DB2CfCdd3DBd38d3700310CA3c76e94799081',
    '0xE052Ef907f09c0053B237647aD7387D4BDF11A5A',
    '0xd2c55a4bBaF9f068a7281ba3204B52ED37fE992a',
  ],
  rinkeby: [''],
  'polygon-mumbai': [''],
  bsctestnet: [''],
}
