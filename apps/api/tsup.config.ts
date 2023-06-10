import { defineConfig } from 'tsup'

export default defineConfig({
	shims: true,
	clean: true,
	bundle: true,
	keepNames: true,
	target: 'esnext',
	outDir: './dist',
	platform: 'node',
	format: ['esm'],
	entryPoints: ['./src/index.ts'],
	minify: process.env.NODE_ENV === 'production',
	onSuccess: async () => {
		console.log('API build success')
	},
})
