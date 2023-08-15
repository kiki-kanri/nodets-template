import strip from '@rollup/plugin-strip';
import path from 'path';
import { defineConfig } from 'rollup';
import _esbuild from 'rollup-plugin-esbuild';
import externals from 'rollup-plugin-node-externals';
import { typescriptPaths } from 'rollup-plugin-typescript-paths';

const distPath = path.join(__dirname, 'dist');
const esbuild = _esbuild.default || _esbuild;
const inputPath = path.join(__dirname, 'src', 'index.ts');

export default defineConfig({
	// Use this setting to set the package as an external package, such as fs-extra, lodash...etc.
	// Docs: https://rollupjs.org/configuration-options/#external
	external: [],
	input: inputPath,
	output: {
		dir: distPath,
		name: 'index.js',
		format: 'cjs'
	},
	plugins: [
		// Must remove debugger statements before other packages.
		strip({ include: ['./src/**/*.ts'] }),
		esbuild({ minify: true }),
		externals(),
		typescriptPaths({ preserveExtensions: true })
	]
});
