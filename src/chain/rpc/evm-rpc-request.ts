import type { Chain } from '@/types'
import { ENV_VARIABLES } from '@/config'
import { networkUrl } from '../mapper'
import { rpcRequest, rpcBatchRequest } from './rpc-request'
import type { RpcError } from './rpc-request'

const { INFURA_KEY: infuraKey } = ENV_VARIABLES
const FROM_ADDRESS = '0x0000000000000000000000000000000000000000'

type EvmRequestParams = { chain: Chain; data: string; contract: string }

type EvmRequest = ({ chain, data, contract }: EvmRequestParams) => Promise<EvmResponse>

type EvmResponse = { result: string | null; error: RpcError | null }

type RpcPayloadParams = [{ from: string; to: string; data: string }, 'latest']

export const evmRpcRequest: EvmRequest = async requestParams => {
  const { chain, data, contract } = requestParams
  const url = networkUrl({ chain, infuraKey })
  const params: RpcPayloadParams = [{ from: FROM_ADDRESS, to: contract, data }, 'latest']

  const { result, error } = await rpcRequest<RpcPayloadParams>({ url, params })
  return { result: result ?? null, error: error ?? null }
}

type EvmBatchRequestParams = { chain: Chain; dataArray: string[]; contract: string }

type EvmBatchRequest = ({ chain, dataArray, contract }: EvmBatchRequestParams) => Promise<EvmResponse[]>

export const evmRpcBatchRequest: EvmBatchRequest = async requestParams => {
  const { chain, dataArray, contract } = requestParams
  const url = networkUrl({ chain, infuraKey })
  const params: RpcPayloadParams[] = dataArray.map(data => [{ from: FROM_ADDRESS, to: contract, data }, 'latest'])
  const responses = await rpcBatchRequest<RpcPayloadParams>({ url, params })
  const results = responses.map(({ result, error }) => ({ result: result ?? null, error: error ?? null }))
  return results
}
