import strip from '@rollup/plugin-strip';
import path from 'path';
import { defineConfig } from 'rollup';
import { minify } from 'rollup-plugin-esbuild';
import externals from 'rollup-plugin-node-externals';
import ts from 'rollup-plugin-ts';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distPath = path.join(__dirname, 'dist');
const inputPath = path.join(__dirname, 'src', 'index.ts');

// https://rollupjs.org/configuration-options
export default defineConfig({
	input: inputPath,
	output: {
		dir: distPath,
		name: 'index.js',
		format: 'es'
	},
	plugins: [
		// Typescript plugin must be loaded before the rest of the plugin with transform method.
		ts(),
		strip({ include: ['./src/**/*.ts'] }),
		minify(),
		externals()
	]
});
