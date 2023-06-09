/** @type {import('node:path')} */
const path = require('node:path')

const rootConfig = path.join(__dirname, '..', '..', '.prettierrc.cjs')

/** @type {import('prettier').Config} */
module.exports = {
	...require('../../.prettierrc.cjs'),
	plugins: [require.resolve('prettier-plugin-solidity')],
	overrides: [
		{
			files: '*.sol',
			options: {
				printWidth: 80,
				useTabs: false,
				tabWidth: 4,
			},
		},
	],
}
