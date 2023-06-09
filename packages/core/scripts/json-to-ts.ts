#!/usr/bin/env bun
import process from 'node:process'
import fs from 'node:fs/promises'
import prettier from 'prettier'
import prettierConfig from '../.prettierrc.cjs'

run()

async function run() {
	try {
		const directories = await fs.readdir('./out')

		for (const directory of directories) {
			for (const filename of await fs.readdir(`./out/${directory}`)) {
				if (filename.endsWith('.json')) {
					const file = await fs.readFile(`./out/${directory}/${filename}`)
					const json = JSON.parse(file)
					const text = `export const abi = <const>${JSON.stringify(json.abi, undefined, 2)}`
					const abiFilename = filename.replace('.json', '')
					// check if directory exists and create it if not
					await fs.mkdir(`./abi`, { recursive: true })
					await fs.writeFile(
						`./abi/${abiFilename}.ts`,
						prettier.format(text, { parser: 'typescript', ...prettierConfig }),
						{
							encoding: 'utf8',
							flag: 'w',
						}
					)
				}
			}
		}
		process.exit(0)
	} catch (error) {
		const errorMessage = error instanceof Error ? error.message : `Encoutered an error: ` + error
		console.trace(errorMessage)
		process.exit(1)
	}
}
