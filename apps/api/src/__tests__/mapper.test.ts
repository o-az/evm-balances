import { mapChain, POSSIBLE_CHAIN_NAMES } from '@/chain/mapper'
import type { PossibleChainNames } from '@/chain/mapper'
import type { Chain } from '@/types'

const POSSIBLE_CHAIN_AND_ITS_MATCH: Array<{
  mappedChain: Chain
  possibleName: PossibleChainNames
}> = []

beforeAll(() => {
  POSSIBLE_CHAIN_NAMES.forEach(chain => {
    const mappedChain = mapChain(chain)
    POSSIBLE_CHAIN_AND_ITS_MATCH.push({ mappedChain, possibleName: chain })
  })
})

describe('mapChain', () => {
  POSSIBLE_CHAIN_AND_ITS_MATCH.forEach(({ mappedChain, possibleName }) => {
    it(`should map ${possibleName} to ${mappedChain}`, () => {
      expect(mappedChain).toBe(possibleName)
    })
  })
})

test('mainnet to map to ethereum', () => {
  expect(mapChain('mainnet')).toBe('ethereum')
})

test('cosmos to throw an error', () => {
  expect(() => {
    mapChain('cosmos' as any)
  }).toThrowError(/Unknown chain/)
})