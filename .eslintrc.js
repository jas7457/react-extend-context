module.exports = {
	parser: '@typescript-eslint/parser', // Specifies the ESLint parser
	extends: [
		'eslint:recommended',
		'plugin:react/recommended', // Uses the recommended rules from @eslint-plugin-react
		'plugin:@typescript-eslint/recommended', // Uses the recommended rules from @typescript-eslint/eslint-plugin
		'plugin:prettier/recommended', // Enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
		'prettier',
		'prettier/@typescript-eslint'
	],
	parserOptions: {
		ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
		sourceType: 'module', // Allows for the use of imports
		ecmaFeatures: {
			jsx: true // Allows for the parsing of JSX
		}
	},
	rules: {
		// add the prettier plugin to run for eslint
		'prettier/prettier': ['error'],
		'@typescript-eslint/indent': ['error', 'tab'],
		'@typescript-eslint/explicit-function-return-type': ['error']
	},
	settings: {
		react: {
			version: 'detect' // Tells eslint-plugin-react to automatically detect the version of React to use
		}
	},
	plugins: ['jest'],
	overrides: [
		{
			// gather all of our js files to turn off some ts rules
			files: ['*.js'],
			rules: {
				'@typescript-eslint/explicit-function-return-type': ['off'],
				'@typescript-eslint/no-var-requires': ['off']
			},
			env: {
				node: true
			}
		},
		{
			files: ['*.tsx'],
			rules: {
				// turn off explicit return types for tsx files (React components)
				'@typescript-eslint/explicit-function-return-type': ['off']
			}
		},
		{
			// gather all of our unit test files to turn on jest globals
			files: ['*.test.tsx'],
			env: {
				jest: true
			}
		}
	]
};
