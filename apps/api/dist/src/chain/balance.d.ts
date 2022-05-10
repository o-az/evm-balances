import type { Chain, Balance } from '../types';
import type { PossibleChainNames } from './mapper';
export declare function getTokensBalances({ address, tokens, chain, }: {
    address: string;
    tokens?: string[];
    chain: PossibleChainNames | Chain;
}): Promise<{
    balances: Balance[];
    error: string | null;
}>;
//# sourceMappingURL=balance.d.ts.map