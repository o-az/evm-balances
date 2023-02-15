import type { Chain } from '@/types';
import { ENV_VARIABLES } from '@/config';
import { networkUrl } from '../mapper';
import { rpcBatchRequest, rpcRequest } from './rpc-request';
import type { RpcError } from './rpc-request';

const { INFURA_KEY: infuraKey } = ENV_VARIABLES;
const FROM_ADDRESS = '0x0000000000000000000000000000000000000000';

type EvmRequestParameters = { chain: Chain; data: string; contract: string };

type EvmRequest = ({ chain, data, contract }: EvmRequestParameters) => Promise<EvmResponse>;

type EvmResponse = { result: string | null; error: RpcError | null };

type RpcPayloadParameters = [{ from: string; to: string; data: string }, 'latest'];

export const evmRpcRequest: EvmRequest = async requestParameters => {
  const { chain, data, contract } = requestParameters;
  const url = networkUrl({ chain, infuraKey });
  const parameters: RpcPayloadParameters = [{ from: FROM_ADDRESS, to: contract, data }, 'latest'];

  const { result, error } = await rpcRequest<RpcPayloadParameters>({ url, params: parameters });
  return { result: result ?? null, error: error ?? null };
};

type EvmBatchRequestParameters = { chain: Chain; dataArray: string[]; contract: string };

type EvmBatchRequest = ({
  chain,
  dataArray,
  contract,
}: EvmBatchRequestParameters) => Promise<EvmResponse[]>;

export const evmRpcBatchRequest: EvmBatchRequest = async requestParameters => {
  const { chain, dataArray, contract } = requestParameters;
  const url = networkUrl({ chain, infuraKey });
  const parameters: RpcPayloadParameters[] = dataArray.map(data => [
    { from: FROM_ADDRESS, to: contract, data },
    'latest',
  ]);
  const responses = await rpcBatchRequest<RpcPayloadParameters>({ url, params: parameters });
  const results = responses.map(({ result, error }) => ({
    result: result ?? null,
    error: error ?? null,
  }));
  return results;
};
