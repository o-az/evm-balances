/** @type {import('prettier').Config} */
module.exports = {
	semi: false,
	tabWidth: 2,
	useTabs: true,
	printWidth: 120,
	endOfLine: 'auto',
	singleQuote: true,
	proseWrap: 'never',
	jsxSingleQuote: true,
	arrowParens: 'avoid',
	singleAttributePerLine: true,
	plugins: [require.resolve('prettier-plugin-sh'), require.resolve('prettier-plugin-toml')],
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
