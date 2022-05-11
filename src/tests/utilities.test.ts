import { test, it, describe, expect, beforeAll } from 'vitest'
import { textContains } from '@/utilities'
import { POSSIBLE_CHAIN_NAMES } from '@/chain/mapper'
import type { PossibleChainNames } from '@/chain/mapper'


expect(() => {
  const text = 'polygon-mainnet'
  let result = false
  for (const chain of POSSIBLE_CHAIN_NAMES) {
    if (textContains(text, chain)) {
       console.log(`${text} contains ${chain}`)
      result = true
    }
  }
  return result
}).toBeCloseTo
