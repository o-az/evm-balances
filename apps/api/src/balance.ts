import { readContract } from 'viem/contract'
import { type Address, type PublicClient, getAddress } from 'viem'

import { chains } from '#/constants'
import { BALANCES_OF_ABI, ERC20_ABI } from '#/constants/abi'
import { sliceToChunks, sleep, isNotFalsy, raise } from '#/utilities'
import type { Chain, Token, TokenBalance } from '#/types'

/* The basic ERC20 `balanceOf` function. Returns `undefined` if the balance is 0. */
export async function balanceOf({
  client,
  walletAddress,
  token,
}: {
  client: PublicClient
  walletAddress: Address
  token: Token
}) {
  try {
    const providedToken = getAddress(typeof token === 'string' ? token : token.address)
    const result = await readContract(client, {
      abi: ERC20_ABI,
      address: providedToken,
      functionName: 'balanceOf',
      args: [getAddress(walletAddress)],
    })
    return { ...token, balance: result.toString() }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : JSON.stringify(error)
    console.error(`[balanceOf()] ${errorMessage}`)
    raise(error)
  }
}

/**
 * Checks if the token is supported by the multi-coin contract. Balances of 0 are not returned.
 * On success, returns token balances array.
 * On failure, returns the token that failed.
 */
export async function balancesOf({
  client,
  chain,
  walletAddress,
  tokens,
}: {
  client: PublicClient
  chain: Chain
  walletAddress: Address
  tokens: Array<Token>
}): Promise<
  | {
      success: true
      result: Array<TokenBalance>
    }
  | {
      success: false
      result: Array<Token>
    }
> {
  try {
    const [nativeResult, ...results] = await readContract(client, {
      abi: BALANCES_OF_ABI,
      address: chains[chain].contract,
      functionName: 'balancesOf',
      args: [getAddress(walletAddress), tokens.map(token => token.address)],
    })

    const balances: Array<TokenBalance> = []

    for (const [index, balance] of results.entries()) {
      if (!balance || balance == 0n) continue
      const token = tokens[index]
      if (!token) continue
      balances.push({
        ...token,
        balance: balance.toString(),
      })
    }
    if (typeof nativeResult !== 'bigint')
      return {
        success: true,
        result: balances,
      }
    return {
      success: true,
      result: [
        {
          ...chains[chain].gasToken,
          balance: nativeResult.toString(),
        },
        ...balances,
      ],
    }
  } catch {
    return {
      success: false,
      result: tokens,
    }
  }
}

export async function userBalances({
  client,
  chain,
  walletAddress,
  tokens,
  chunkSize = 750,
}: {
  client: PublicClient
  chain: Chain
  walletAddress: Address
  tokens: Array<Token>
  chunkSize?: number
}): Promise<Array<TokenBalance>> {
  const chunks = sliceToChunks(
    tokens.map(item => ({
      ...item,
      address: getAddress(item.address),
    })),
    chunkSize,
  ) as Array<Array<Token>>

  const balancesResults = await Promise.allSettled(
    chunks.map(async chunk => {
      const result = await balancesOf({
        client,
        chain,
        walletAddress,
        tokens: chunk,
      })
      sleep(1)
      return result
    }),
  )

  const balances: Array<TokenBalance> = []
  const natives: Array<TokenBalance> = []
  const rejected: Array<Token> = []
  for (const [index, balancesResult] of balancesResults.entries()) {
    if (balancesResult.status !== 'fulfilled' || balancesResult.value.success != true) {
      //@ts-ignore
      rejected.push(...chunks[index])
      continue
    }

    const [nativeBalance, ...tokensBalances] = balancesResult.value.result
    balances.push(...tokensBalances)
    if (nativeBalance) natives.push(nativeBalance)
  }

  const retry = await Promise.all(rejected.map(token => balanceOf({ client, walletAddress, token })))
  const filteredRetry = retry.filter(token => isNotFalsy(token.balance))

  if (!natives[0]) {
    return [
      Object.assign({}, chains[chain].gasToken, {
        chain,
        balance: (
          await client.getBalance({
            address: walletAddress,
          })
        ).toString(),
      }),
      ...balances,
      ...filteredRetry,
    ]
  }
  return [natives[0], ...balances, ...filteredRetry]
}
