import { readContract } from 'viem/contract'
import { type Address, type PublicClient, formatUnits } from 'viem'

import { BALANCES_OF_ABI } from './constants/abi'
import { chains } from './constants'
import { sliceToChunks } from './utilities'
import type { Chain, Token, TokenBalance } from './types'

export async function multicallBalancesOf({
	client,
	chain,
	address: walletAddress,
	tokens,
}: {
	client: PublicClient
	chain: Chain
	address: Address
	tokens: Array<Token>
}): Promise<TokenBalance[]> {
	const tokensChunks = sliceToChunks(tokens, 0)
	const multicallResult = await client.multicall({
		contracts: [
			{
				address: chains[chain]['contract'],
				abi: BALANCES_OF_ABI,
				functionName: 'balancesOf',
				args: [walletAddress, tokens.map(token => token.address).slice(0, 256)],
			},
		],
		multicallAddress: '0xcA11bde05977b3631167028862bE2a173976CA11',
	})

	const balancesResult = multicallResult
		.map(result => result.result)
		.filter((balance): balance is Array<bigint> => Array.isArray(balance))
		// remove first element of each array
		.map(balance => balance.slice(1))

	if (balancesResult.length === 0 || !Array.isArray(balancesResult[0])) return []

	// remove native balance from each array
	const filteredBalances = (balancesResult.length === 1 ? balancesResult[0] : balancesResult.flat()) as Array<bigint>

	const tokensBalances = <Array<TokenBalance>>[]

	for (const [index, balance] of filteredBalances.entries()) {
		if (balance === 0n || typeof balance !== 'bigint') continue
		const token = tokens[index]
		if (!token) continue
		tokensBalances.push({
			balance: formatUnits(balance, token.decimals),
			...token,
		})
	}
	const nativeBalance = balancesResult[0][0] ?? 0n
	return [
		{
			balance: formatUnits(nativeBalance, chains[chain].gasToken.decimals),
			...chains[chain].gasToken,
		},
		...tokensBalances,
	]
}

export const balancesOf = async ({
	client,
	chain,
	address: walletAddress,
	tokens,
}: {
	client: PublicClient
	chain: Chain
	address: Address
	tokens: Array<Token>
}): Promise<Array<TokenBalance>> => {
	const [nativeBalance, ...balancesCall] = await readContract(client, {
		abi: BALANCES_OF_ABI,
		address: chains[chain]['contract'],
		functionName: 'balancesOf',
		args: [walletAddress, tokens.map(token => token.address)],
	})
	const tokensBalances = <Array<TokenBalance>>[]
	for (const [index, balance] of balancesCall.entries()) {
		if (balance === 0n || typeof balance !== 'bigint') continue
		const token = tokens[index]
		if (!token) continue
		tokensBalances.push({
			balance: formatUnits(balance, token.decimals),
			...token,
		})
	}
	return [
		...tokensBalances,
		{
			balance: formatUnits(nativeBalance ?? 0n, chains[chain].gasToken.decimals),
			...chains[chain].gasToken,
		},
	]
}
