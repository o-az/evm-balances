import type { Address } from 'viem'
import type { Chain, Token } from './types'

type EVMTokenResponse<T> = { success: true; data: 'Invalid token.' } | T

export async function getChainToken(
  chain: Chain,
  address: Address
): Promise<{ success: false; data: 'unsupported' } | { success: true; data: Token }> {
  const response = await fetch(`https://tokens.evm.workers.dev/${chain}/token/${address}`)

  if (!response.ok) return { success: false, data: 'unsupported' }
  const json = await response.json<EVMTokenResponse<Token>>()
  if ('success' in json) return { success: false, data: 'unsupported' }
  return { success: true, data: json }
}
export async function getChainTokens(chain: Chain): Promise<Token[]> {
  const response = await fetch(`https://tokens.evm.workers.dev/${chain}`)
  const tokens = (await response.json()) as Token[]
  return tokens
}

export async function getAllTokens(): Promise<Array<Array<Token>>> {
  const response = await fetch('https://tokens.evm.workers.dev/everything')
  const tokens = await response.json<Array<Array<Token>>>()
  return tokens
}
