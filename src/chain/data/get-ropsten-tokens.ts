import { writeFile } from "fs/promises";

const BASE_URL =
  "https://wispy-bird-88a7.uniswap.workers.dev/?url=http://testnet.tokenlist.eth.link";

async function getTokens() {
  const response = await fetch(BASE_URL);
  try {
    const json = (await response.json()) as RopstenResponse;
    return json;
  } catch (error) {
    console.trace(error);
    throw new Error("Failed to fetch polygon tokens");
  }
}

type Token = Record<string, { symbol: string; name: string; decimals: number }>;

function filterTokens(tokens: RopstenToken[]): Token {
  const filteredTokens = {} as Token;
  tokens
    .filter(({ chainId }) => chainId === 42)
    .map(({ address, symbol, name, decimals }) => {
      filteredTokens[address] = { symbol, name, decimals };
    });
  return filteredTokens;
}

export async function main() {
  const { tokens } = await getTokens();
  const filteredTokens = filterTokens(tokens);
  await writeFile(
    "./src/data/tokens/ropsten.json",
    JSON.stringify(filteredTokens, null, 2)
  );
  const contracts = Object.keys(filteredTokens);
  await writeFile(
    "./src/data/tokens/ropsten-contracts.json",
    JSON.stringify(contracts, null, 2)
  );
}

main().then((_) => console.log(JSON.stringify(_, null, 2)));

interface RopstenResponse {
  name: string;
  logoURI: string;
  keywords: string[];
  tags: Record<string, string>;
  timestamp: string;
  version: Record<"major" | "minor" | "patch", number>;
  tokens: RopstenToken[];
}

interface RopstenToken {
  chainId: number;
  address: string;
  symbol: string;
  name: string;
  decimals: number;
  logoURI: string;
  tags: string[];
}
