import { Chain } from '../types';
export declare const POSSIBLE_CHAIN_NAMES: string[];
export declare type PossibleChainNames = typeof POSSIBLE_CHAIN_NAMES[number];
export declare const networkUrl: ({ chain, infuraKey, alchemyKey, }: {
    chain: PossibleChainNames | Chain;
    infuraKey?: string | undefined;
    alchemyKey?: string | undefined;
}) => string;
export declare function mapChain(chain: PossibleChainNames): Chain;
//# sourceMappingURL=mapper.d.ts.map