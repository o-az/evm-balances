import type { Chain } from '@/types'
import { ENV_VARIABLES } from '@/config'

const KEY = ENV_VARIABLES.INFURA_KEY

export async function rpcRequest({ from, to, data, chain }: { from: string; to: string; data: string; chain: Chain }) {
  try {
    const response = await fetch(`https://${chain}.infura.io/v3/${KEY}`, {
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
    const json = (await response.json()) as {
      jsonrpc: string
      id: number
      result?: string
      error?: { code: number; message: string }
    }
    if (json.error || !json.result) {
      throw new Error(`JSON error: ${JSON.stringify(json)}`)
    }

    return json.result
  } catch (error) {
    console.trace(error)
    return null
  }
}
