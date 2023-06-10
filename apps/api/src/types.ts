export type Pretty<T> = {
	[K in keyof T]: T[K]
} & {}

export type Truthy<T> = Pick<
	T,
	{
		[K in keyof T]: T[K] extends undefined | null ? never : K
	}[keyof T]
>

export type Environment = Pretty<Env>

export interface ExecutionContext {
	waitUntil(promise: Promise<unknown>): void
	passThroughOnException(): void
}
