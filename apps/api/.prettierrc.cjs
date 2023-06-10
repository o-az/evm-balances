/** @type {import('node:path')} */
const path = require('node:path')

const rootConfig = path.join(__dirname, '..', '..', '.prettierrc.cjs')

/** @type {import('prettier').Config} */
module.exports = {
	...require(rootConfig),
	plugins: [require.resolve('prettier-plugin-toml')],
	overrides: [
		{
			files: '*.toml',
			options: {
				printWidth: 80,
				useTabs: true,
				tabWidth: 2,
			},
		},
	],
}
