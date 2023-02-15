import { beforeAll, describe, expect, it, test } from 'vitest';
import { POSSIBLE_CHAIN_NAMES, mapChain } from '@/chain/mapper';
import type { PossibleChainNames } from '@/chain/mapper';
import type { Chain } from '@/types';

const POSSIBLE_CHAIN_AND_ITS_MATCH: Array<{
  mappedChain: Chain;
  possibleName: PossibleChainNames;
}> = [];

beforeAll(() => {
  for (const chain of POSSIBLE_CHAIN_NAMES) {
    const mappedChain = mapChain(chain);
    POSSIBLE_CHAIN_AND_ITS_MATCH.push({ mappedChain, possibleName: chain });
  }
});

describe('mapChain', () => {
  for (const { mappedChain, possibleName } of POSSIBLE_CHAIN_AND_ITS_MATCH) {
    it(`should map ${possibleName} to ${mappedChain}`, () => {
      expect(mappedChain).toBe(possibleName);
    });
  }
});

test('mainnet to map to ethereum', () => {
  expect(mapChain('mainnet')).toBe('ethereum');
});

test('cosmos to throw an error', () => {
  expect(() => {
    mapChain('cosmos' as any);
  }).toThrowError(/Unknown chain/);
});
