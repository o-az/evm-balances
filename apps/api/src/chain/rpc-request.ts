import type { Chain } from '@/types'
import { ENV_VARIABLES } from '@/config'
import { networkUrl } from './mapper'
import fetch from 'isomorphic-unfetch'

interface RpcResponse {
  jsonrpc: string
  id: number
  result?: string
  error?: { code: number; message: string }
}

const KEY = ENV_VARIABLES.INFURA_KEY

export async function rpcRequest({ from, to, data, chain }: { from: string; to: string; data: string; chain: Chain }) {
  try {
    const url = networkUrl({ chain, infuraKey: ENV_VARIABLES.INFURA_KEY })

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 1,
        method: 'eth_call',
        params: [{ from, to, data }, 'latest'],
      }),
    })
    if (!response.ok) {
      throw new Error(`Response not ok: ${response.status} - ${response.statusText}`)
    }
    const json: RpcResponse = await response.json()
    if (json.error || !json.result) {
      throw new Error(`JSON error: ${JSON.stringify(json)}`)
    }

    return json.result
  } catch (error) {
    console.trace(error)
    return null
  }
}
