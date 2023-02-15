import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: { globals: true },
  logLevel: 'info',
  resolve: {
    alias: { '@': './src' },
  },
  plugins: [],
});
