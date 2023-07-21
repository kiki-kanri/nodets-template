const path = require('path');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

const distPath = path.resolve(__dirname, 'dist');
const srcPath = path.resolve(__dirname, 'src');

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
				loader: 'ts-loader',
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
		minimizer: [new TerserPlugin()]
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
		extensions: [
			'.js',
			'.ts'
		],
		plugins: [
			new TsconfigPathsPlugin()
		]
	},
	target: 'node'
}
