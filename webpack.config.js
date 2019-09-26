const path = require('path');

module.exports = {
	mode: 'production',
	entry: './src/ReactExtendContext.tsx',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'ReactExtendContext.js',
		libraryTarget: 'commonjs2'
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/
			}
		]
	}
};
