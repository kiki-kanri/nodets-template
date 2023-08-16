const { EsbuildPlugin } = require('esbuild-loader');
const path = require('path');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

const distPath = path.join(__dirname, 'dist');
const srcPath = path.join(__dirname, 'src');

module.exports = {
	entry: './src/index.ts',
	externals: [
		nodeExternals()
	],
	mode: 'production',
	module: {
		rules: [
			{
				exclude: /node_modules/,
				include: [srcPath],
				loader: 'esbuild-loader',
				options: { target: 'esnext' },
				test: /\.ts$/
			}
		]
	},
	node: {
		__filename: true,
		__dirname: true
	},
	optimization: {
		minimize: true,
		minimizer: [new EsbuildPlugin({ target: 'esnext' })]
	},
	output: {
		filename: 'index.js',
		path: distPath,
		publicPath: 'dist'
	},
	plugins: [
		new ProgressBarPlugin()
	],
	resolve: {
		extensions: ['.ts'],
		plugins: [new TsconfigPathsPlugin()]
	},
	target: 'node'
}
