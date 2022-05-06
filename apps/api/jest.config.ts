import { defaults } from 'jest-config'
import type { Config } from '@jest/types'
import { pathsToModuleNameMapper } from 'ts-jest'

import { compilerOptions } from './tsconfig.json'

const config: Config.InitialOptions = {
  //@ts-ignore
  globals: { fetch },
  ...defaults,
  verbose: true,
  injectGlobals: true,
  testEnvironment: 'node',
  preset: 'ts-jest/presets/default-esm',
  moduleFileExtensions: ['ts', 'js', 'node'],
  testMatch: ['**/__tests__/**/*.{ts,js,jsx,tsx}'],
  coveragePathIgnorePatterns: ['.*__snapshots__.*'],
  collectCoverageFrom: ['src/**/*.{ts,js,jsx,tsx}', '!**/node_modules/**'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' }),
}

export default config
