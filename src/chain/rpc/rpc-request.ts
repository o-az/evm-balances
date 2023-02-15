interface RpcResponse {
  jsonrpc: '2.0';
  id: number;
  result?: string;
  error?: RpcError;
}

export type RpcError = { code: number; message: string };

export async function rpcRequest<T>({
  url,
  params,
}: {
  url: string;
  params: T;
}): Promise<RpcResponse> {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 1,
        method: 'eth_call',
        params,
      }),
    });
    if (!response.ok) {
      throw new Error(`Response not ok: ${response.status} - ${response.statusText}`);
    }
    const json: RpcResponse = await response.json();
    return json;
  } catch (error) {
    throw new Error(`RPC request failed: ${error instanceof Error ? error.message : error}`);
  }
}

export async function rpcBatchRequest<T>({
  url,
  params,
}: {
  url: string;
  params: T[];
}): Promise<Array<RpcResponse>> {
  const rpcParameters = params.map((p, id) => ({
    jsonrpc: '2.0',
    id,
    method: 'eth_call',
    params: p,
  }));
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(rpcParameters),
    });
    if (!response.ok) {
      throw new Error(`Response not ok: ${response.status} - ${response.statusText}`);
    }
    const json: Array<RpcResponse> = await response.json();
    return json;
  } catch (error) {
    throw new Error(`RPC request failed: ${error instanceof Error ? error.message : error}`);
  }
}
