#!/usr/bin/env node
import { getAddress, http } from 'viem'
import { mainnet } from 'viem/chains'
import { createPublicClient } from 'viem'
import { abi as BALANCES_OF_ABI } from '../abi/BalancesOf'

main()
	.then(console.log)
	.catch(error => {
		console.error(error)
		process.exit(1)
	})

async function main() {
	const publicClient = createPublicClient({ chain: mainnet, transport: http() })

	// Vitalik's wallet
	const walletAddress = '0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B'

	const tokens = [['DAI', '0x6b175474e89094c44da98b954eedeac495271d0f']] as const

	const [ethBalance, ...balances] = await publicClient.readContract({
		abi: BALANCES_OF_ABI,
		address: '0x13675852Ac733AEd5679985778BE5c18E64E97FA',
		functionName: 'balancesOf',
		args: [
			walletAddress,
			// Tokens
			tokens.map(([, address]) => getAddress(address)),
		],
	})

	return {
		walletAddress,
		balances: [['ETH', ethBalance], ...tokens.map(([symbol], index) => [symbol, balances[index]])],
	}
}
