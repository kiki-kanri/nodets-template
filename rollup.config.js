import strip from '@rollup/plugin-strip';
import path from 'path';
import { defineConfig } from 'rollup';
import { minify } from 'rollup-plugin-esbuild';
import externals from 'rollup-plugin-node-externals';
import ts from 'rollup-plugin-ts';

const distPath = path.join(__dirname, 'dist');
const inputPath = path.join(__dirname, 'src', 'index.ts');

// https://rollupjs.org/configuration-options
export default defineConfig({
	input: inputPath,
	output: {
		dir: distPath,
		name: 'index.js',
		format: 'cjs'
	},
	plugins: [
		// Typescript plugin must be loaded before the rest of the plugin with transform method.
		ts(),
		strip({ include: ['./src/**/*.ts'] }),
		minify(),
		externals()
	]
});
