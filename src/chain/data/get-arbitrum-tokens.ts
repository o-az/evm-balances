import { writeFile } from "fs/promises";

const BASE_URL = "https://bridge.arbitrum.io/token-list-42161.json";

async function getTokens() {
  const response = await fetch(BASE_URL);
  try {
    const json = (await response.json()) as ArbitrumResponse;
    return json;
  } catch (error) {
    console.trace(error);
    throw new Error("Failed to fetch polygon tokens");
  }
}

type Token = Record<string, { symbol: string; name: string; decimals: number }>;

function filterTokens(tokens: ArbitrumToken[]) {
  const filteredTokens = {} as Token;
  tokens
    .filter(({ chainId }) => chainId === 42161)
    .map(({ address, symbol, name, decimals }) => {
      filteredTokens[address.toLowerCase()] = { symbol, name, decimals };
    });
  return filteredTokens;
}

export async function main() {
  const { tokens } = await getTokens();
  const filteredTokens = filterTokens(tokens);
  await writeFile(
    "./src/data/tokens/arbitrum.json",
    JSON.stringify(filteredTokens, null, 2)
  );
  const contracts = Object.keys(filteredTokens);
  await writeFile(
    "./src/data/tokens/arbitrum-contracts.json",
    JSON.stringify(contracts, null, 2)
  );
}

main().then((_) => console.log(JSON.stringify(_, null, 2)));

interface ArbitrumResponse {
  name: string;
  timestamp: string;
  version: Record<"major" | "minor" | "patch", number>;
  tokens: ArbitrumToken[];
}

interface ArbitrumToken {
  logoURI: string;
  chainId: number;
  address: string;
  name: string;
  symbol: string;
  decimals: number;
  extensions: {
    bridgeInfo: {
      [key: number]: {
        tokenAddress: string;
        originBridgeAddress: string;
        destBridgeAddress: string;
      };
    };
    l1Address: string;
    l2GatewayAddress: string;
    l1GatewayAddress: string;
  };
}
