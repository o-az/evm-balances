import { isAddress, type Address, getAddress } from 'viem'
import { ERC20_ABI, BALANCES_OF_ABI } from '../abi'
import { it, expect, describe } from 'bun:test'
import { repeatArray } from './utilities'
import { type Chain, publicClient, walletClient } from './client'

/**
 * Run with
 * ```bash
 * DEPLOYED_CONTRACT=0x021DBfF4A864Aa25c51F0ad2Cd73266Fde66199d bun test test
 * ```
 */

const targetChain = (c = 'foundry') => c as unknown as Chain

// random rich wallet
const testWalletAddress = '0xbdfa4f4492dd7b7cf211209c4791af8d52bf5c50'

// This will change when running anvil and redeploying the contract locally
const deployedContract = isAddress(process.env.DEPLOYED_CONTRACT)
  ? getAddress(process.env.DEPLOYED_CONTRACT)
  : '0x245e77E56b1514D77910c9303e4b44dDb44B788c'

describe('BalancesOf', async () => {
  const [walletAddress] = (
    targetChain() === 'foundry' ? await walletClient('foundry').getAddresses() : [testWalletAddress]
  ) as [Address]
  it('should return ETH balance if array empty', async () => {
    const balancesFromContract = await publicClient(targetChain()).readContract({
      abi: BALANCES_OF_ABI,
      address: deployedContract,
      functionName: 'balancesOf',
      args: [walletAddress, []],
    })
    const balanceFromClient = await publicClient(targetChain()).getBalance({
      address: walletAddress,
    })
    expect(balancesFromContract).toBeDefined()
    expect(balancesFromContract.length).toEqual(1)
    expect(balancesFromContract[0]).toEqual(balanceFromClient)
  })
})

// const DAI_GOERLI = '0xDF1742fE5b0bFc12331D8EAec6b478DfDbD31464'
const DAI_MAINNET = '0x6b175474e89094c44da98b954eedeac495271d0f'
// const DAI_SEPOLIA = '0x82fb927676b53b6eE07904780c7be9b4B50dB80b'
// const TOKEN_ARBITRUM = '0xfc5A1A6EB076a2C7aD06eD22C90d7E710E35ad0a'

const TOKEN_ADDRESS = DAI_MAINNET

describe.skipIf(Boolean(process.env.CI))('BalancesOf', async () => {
  it('should return ETH balance + DAI balance', async () => {
    const [walletAddress] = (
      targetChain() === 'foundry' ? await walletClient('foundry').getAddresses() : [testWalletAddress]
    ) as [Address]
    const ethBalance = await publicClient(targetChain()).getBalance({ address: walletAddress })
    const balancesFromContract = await publicClient(targetChain()).readContract({
      abi: BALANCES_OF_ABI,
      address: deployedContract,
      functionName: 'balancesOf',
      args: [walletAddress, [TOKEN_ADDRESS]],
    })
    expect(balancesFromContract).toBeDefined()
    expect(balancesFromContract.length).toEqual(2)
    const balanceFromDAIContract = await publicClient(targetChain()).readContract({
      abi: ERC20_ABI,
      address: TOKEN_ADDRESS,
      functionName: 'balanceOf',
      args: [walletAddress],
    })
    expect(balanceFromDAIContract).toBeDefined()
    expect(balancesFromContract[1]).toEqual(balanceFromDAIContract)
    expect([ethBalance, balanceFromDAIContract]).toEqual(balancesFromContract)
  })
})

const fetchTokens = async () =>
  fetch('https://wispy-bird-88a7.uniswap.workers.dev/?url=http://erc20.cmc.eth.link').then(result =>
    result.json()
  ) as Promise<{
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    tokens: Array<any>
  }>

describe('BalancesOf', async () => {
  it('should return array of 70 elements (tokens + ETH native)', async () => {
    const tokens = await fetchTokens()
    const contractAddresses = tokens.tokens.map(({ address }) => address) as Address[]

    const balanceFromContract = await publicClient(targetChain()).readContract({
      abi: BALANCES_OF_ABI,
      address: deployedContract,
      functionName: 'balancesOf',
      args: [testWalletAddress, contractAddresses],
    })
    expect(balanceFromContract).toBeDefined()
    expect(balanceFromContract.length).toEqual(70)
  })
})

describe('BalancesOf', async () => {
  it('should return array size > 10000 (tokens array repeated)', async () => {
    const tokens = await fetchTokens()
    const contractAddresses = tokens.tokens.map(({ address }) => address) as Address[]

    const balanceFromContract = await publicClient(targetChain()).readContract({
      abi: BALANCES_OF_ABI,
      address: deployedContract,
      functionName: 'balancesOf',
      args: [testWalletAddress, repeatArray(contractAddresses, 175)],
    })
    expect(balanceFromContract).toBeDefined()
    expect(balanceFromContract.length).toBeGreaterThan(12_000)
  })
})
