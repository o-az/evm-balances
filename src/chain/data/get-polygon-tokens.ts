import { writeFile } from 'node:fs/promises';

const BASE_URL = 'https://tokenmapper.api.matic.today/api/v1/mapping';

async function getTokens({ limit, offset }: { limit: number; offset: number }) {
  const queryParameters = new URLSearchParams({
    map_type: '["POS"]',
    chain_id: '137',
    limit: String(limit),
    offset: String(offset),
  });
  const response = await fetch(`${BASE_URL}?${queryParameters}`);
  try {
    const json = (await response.json()) as RequestResponse;
    return json;
  } catch (error) {
    console.trace(error);
    throw new Error('Failed to fetch polygon tokens');
  }
}

type Token = Record<string, { symbol: string; name: string; decimals: number }>;

function filterTokens(tokens: MappingToken[]) {
  const polygon = {} as Token;
  const ethereum = {} as Token;
  tokens
    .filter(({ deleted }) => !deleted)
    .map(({ root_token, child_token, symbol, name, decimals }) => {
      polygon[root_token] = { symbol, name, decimals };
      ethereum[child_token] = { symbol, name, decimals };
    });

  return [polygon, ethereum];
}

export async function main() {
  const response = await getTokens({ limit: 200, offset: 0 });
  const { mapping, has_next_page } = response.data;
  const [polygon, ethereum] = filterTokens(mapping);
  let [polygonTokens, ethereumTokens] = [polygon, ethereum];
  let hasNextPage = has_next_page && mapping.length > 0;
  let nextOffset = 200;
  while (hasNextPage) {
    const nextResponse = await getTokens({ offset: nextOffset, limit: 200 });
    const { mapping, has_next_page } = nextResponse.data;
    const [polygon, ethereum] = filterTokens(mapping);
    polygonTokens = { ...polygonTokens, ...polygon };
    ethereumTokens = { ...ethereumTokens, ...ethereum };
    hasNextPage = has_next_page && mapping.length > 0;
    nextOffset += 200;
  }
  await writeFile('./src/data/tokens/ethereum.json', JSON.stringify(ethereumTokens));
  await writeFile('./src/data/tokens/polygon.json', JSON.stringify(polygonTokens));
  const polygonContracts = Object.keys(polygonTokens);
  await writeFile('./src/data/tokens/polygon-contracts.json', JSON.stringify(polygonContracts));
  const ethereumContracts = Object.keys(ethereumTokens);
  await writeFile('./src/data/tokens/ethereum-contracts.json', JSON.stringify(ethereumContracts));
}

(async () => main())();

interface RequestResponse {
  message: string;
  data: {
    mapping: MappingToken[];
    limit: number;
    offset: number;
    has_next_page: boolean;
  };
  mappedCount: number;
  requestsCount: number;
}

interface MappingToken {
  root_token: string;
  child_token: string;
  mintable: boolean;
  owner: string;
  map_type: string;
  token_type: string;
  decimals: number;
  name: string;
  symbol: string;
  child_address_passed_by_user: boolean;
  deleted: boolean;
  chainId: number;
  status: number;
  uri: string;
  count: number;
  reason: string;
  created_at: string;
  updated_at: string;
  id: number;
  remapping_request_submitted: boolean;
  new_child_token: string;
  reason_for_remapping: string;
  new_mintable: boolean;
  remapping_allowed: boolean;
  remapping_verified: boolean;
}
