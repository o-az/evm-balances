import type { Address, PublicClient } from 'viem'
import { readContract } from 'viem/contract'
import { chains, type Chain } from './constants'

export const balancesOf = async ({
	client,
	chain,
	address: walletAddress,
	tokens,
}: {
	client: PublicClient
	chain: Chain
	address: Address
	tokens: Array<Address>
}) =>
	await readContract(client, {
		abi: <const>[
			{
				inputs: [
					{
						internalType: 'address',
						name: 'user',
						type: 'address',
					},
					{
						internalType: 'address[]',
						name: 'tokens',
						type: 'address[]',
					},
				],
				name: 'balancesOf',
				outputs: [
					{
						internalType: 'uint256[]',
						name: '',
						type: 'uint256[]',
					},
				],
				stateMutability: 'view',
				type: 'function',
			},
		],
		address: chains[chain]['contract'],
		functionName: 'balancesOf',
		args: [walletAddress, tokens],
	})
