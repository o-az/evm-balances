import type { Address } from 'viem'
import type { Chain, Token } from './types'

/**
 * This custom fetch is only for worker to worker communication
 * 
 * When running dev, use normal fetch and don't use service binding (save $)
 * when running dev --remote or production, use service binding (not possible to use normal fetch)
 */
const ffetch = (env: Env) => (url: string) =>
  Boolean(env.DEV_REMOTE) || env.NODE_ENV === 'production' ? env.TOKEN.fetch(url) : fetch(url)

type EVMTokenResponse<T> = { success: true; data: 'Invalid token.' } | T

export async function getChainToken(
  env: Env,
  {
    chain,
    address,
  }: {
    chain: Chain
    address: Address
  }
): Promise<{ success: false; data: 'unsupported' } | { success: true; data: Token }> {
  const response = await ffetch(env)(`https://tokens.evm.workers.dev/${chain}/token/${address}`)

  if (!response.ok) return { success: false, data: 'unsupported' }
  const json = await response.json<EVMTokenResponse<Token>>()
  if ('success' in json) return { success: false, data: 'unsupported' }
  return { success: true, data: json }
}
export async function getChainTokens(env: Env, { chain }: { chain: Chain }): Promise<Token[]> {
  const response = await ffetch(env)(`https://tokens.evm.workers.dev/${chain}/tokens`)
  const tokens = (await response.json()) as Token[]
  return tokens
}

export async function getAllTokens(env: Env): Promise<Array<Array<Token>>> {
  const response = await ffetch(env)('https://tokens.evm.workers.dev/everything')
  const tokens = await response.json<Array<Array<Token>>>()
  return tokens
}
