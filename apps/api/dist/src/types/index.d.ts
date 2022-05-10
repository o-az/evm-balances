export interface PathParams {
    chain: Chain;
    address: string;
}
export interface QueryParams {
    token: string;
}
export interface Balance {
    address: string;
    balance: string | number;
    name: string;
    symbol: string;
    decimals: number;
}
export declare type Token = {
    [K in string]: {
        symbol: string;
        name: string;
        decimals: number;
    };
};
export declare type Chain = MainnetChain | TestnetChain;
export declare type TestnetChain = 'ropsten' | 'rinkeby' | 'polygon-testnet' | 'bsc-testnet' | 'avalance-testnet';
export declare type MainnetChain = 'bsc' | 'fantom' | 'ethereum' | 'avalanche' | 'polygon' | 'optimism' | 'arbitrum';
//# sourceMappingURL=index.d.ts.map