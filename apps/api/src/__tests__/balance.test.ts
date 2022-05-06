import { jest } from '@jest/globals'
import { getTokensBalances } from '../chain/balance'
import { POLYGON_CONTRACTS } from '../chain/data'

jest.setTimeout(30000)

const TEST_ADDRESSES = [
  '0x52a258ed593c793251a89bfd36cae158ee9fc4f8',
  '0x0d0707963952f2fba59dd06f2b425ace40b492fe',
  '0x26d961f3a1dfd529f87c2925b8f23e3bddeb8583',
  '0xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
]

test(`getTokensBalances({...})`, async () => {
  expect.assertions(2)
  const { error, balances } = await getTokensBalances({
    address: TEST_ADDRESSES[TEST_ADDRESSES.length - 1],
    tokens: POLYGON_CONTRACTS,
    chain: 'polygon-mainnet',
  })
  expect(balances).toMatchObject([])
  expect(error).toContain('Invalid address')
})

// test against TEST_ADDRESSES
TEST_ADDRESSES.forEach(async (address, index) => {
  expect.assertions(1)
  test(`getTokensBalances({...})`, async () => {
    const response = await getTokensBalances({
      address,
      tokens: POLYGON_CONTRACTS,
      chain: 'polygon-mainnet',
    })
    expect(response).not.toBeNull()
  })
})

test('should return balances', async () => {
  expect.assertions(1)
  const { balances, error } = await getTokensBalances({
    address: TEST_ADDRESSES[0],
    tokens: POLYGON_CONTRACTS,
    chain: 'polygon-testnet',
  })
  expect(error).toBeNull()
})

test('getTokensBalances', async () => {
  expect.assertions(2)
  const { balances, error } = await getTokensBalances({
    address: TEST_ADDRESSES[0],
    tokens: POLYGON_CONTRACTS,
    chain: 'polygon',
  })
  expect(balances).not.toBeNull()
  expect(error).toBeNull()
})
