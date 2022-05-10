import type { Chain } from '../types';
export declare function rpcRequest({ from, to, data, chain }: {
    from: string;
    to: string;
    data: string;
    chain: Chain;
}): Promise<string | null>;
//# sourceMappingURL=rpc-request.d.ts.map