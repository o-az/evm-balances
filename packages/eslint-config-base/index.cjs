/** @type {import('eslint').Linter.Config} */
module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
		warnOnUnsupportedTypeScriptVersion: true,
	},
	env: { node: true, browser: true },
	reportUnusedDisableDirectives: true,
	extends: ['eslint:recommended', 'plugin:unicorn/all', 'plugin:@typescript-eslint/recommended', 'prettier'],
	plugins: ['@typescript-eslint', 'prettier'],
	settings: {},
	overrides: [],
	rules: {
		'prettier/prettier': [
			'warn',
			{},
			{
				usePrettierrc: true,
				fileInfoOptions: {
					withNodeModules: true,
				},
			},
		],
		'array-element-newline': ['error', 'consistent'],
		'object-curly-spacing': ['error', 'always'],
		'no-mixed-operators': ['off'],
		'no-multiple-empty-lines': ['off'],
		'no-unexpected-multiline': ['off'],
		'unicorn/numeric-separators-style': ['error', { number: { minimumDigits: 4 } }],
		'unicorn/no-array-callback-reference': ['off'],
		'unicorn/prefer-top-level-await': ['off'],
		'unicorn/prefer-event-target': ['off'],
		'unicorn/prevent-abbreviations': [
			'error',
			{
				allowList: {
					Env: true,
					ProcessEnv: true,
				},
				checkFilenames: false,
			},
		],
		'@typescript-eslint/no-unused-vars': [
			'warn',
			{
				argsIgnorePattern: '^_',
				varsIgnorePattern: '^(?:_.*|NodeJS|ProcessEnv)$',
				caughtErrorsIgnorePattern: '^_',
			},
		],
		'@typescript-eslint/consistent-type-imports': [
			'warn',
			{
				prefer: 'type-imports',
				fixStyle: 'inline-type-imports',
			},
		],
		'@typescript-eslint/ban-ts-comment': ['off'],
		'@typescript-eslint/no-empty-interface': [
			'error',
			{
				allowSingleExtends: true,
			},
		],
		'@typescript-eslint/ban-types': [
			'warn',
			{
				types: {
					'{}': false,
					String: {
						message: 'Use string instead',
						fixWith: 'string',
					},
				},
			},
		],
	},
}