import type { Address } from 'viem'
import type { Chain, Token } from './types'

export async function getChainToken(chain: Chain, address: Address): Promise<Token | Pick<Token, 'address'>> {
	const response = await fetch(
		`https://tokens.up.railway.app/${chain === 'mainnet' ? 'ethereum' : chain}/token/${address}`
	)
	const token = (await response.json()) as Token
	// TODO doesn't feel right
	return Object.hasOwn(token, 'success') ? { address } : token
}
export async function getChainTokens(chain: Chain): Promise<Token[]> {
	const response = await fetch(`https://tokens.up.railway.app/${chain === 'mainnet' ? 'ethereum' : chain}`)
	const tokens = (await response.json()) as Token[]
	return tokens
}

// TODO: Implement this function.
export function getAllTokens(): Record<Chain, Array<Address>> {
	//@ts-expect-error
	return {}
}
