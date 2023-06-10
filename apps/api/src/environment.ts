import type { Environment } from './types'
import process from 'node:process'

export function environment<K extends keyof Environment>(environmentVariable: K): Environment[K] {
	if (!process.env[environmentVariable]) throw new Error(`\nEnvironment variable ${environmentVariable} is not set\n`)
	return process.env[environmentVariable]
}
