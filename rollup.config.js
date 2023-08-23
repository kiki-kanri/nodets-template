import strip from '@rollup/plugin-strip';
import path from 'path';
import { defineConfig } from 'rollup';
import _esbuild from 'rollup-plugin-esbuild';
import externals from 'rollup-plugin-node-externals';
import tsConfigPaths from 'rollup-plugin-tsconfig-paths';

const distPath = path.join(__dirname, 'dist');
const esbuild = _esbuild.default || _esbuild;
const inputPath = path.join(__dirname, 'src', 'index.ts');

// https://rollupjs.org/configuration-options
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
		// Remove the debugger statement plugin must be loaded before the rest of the plugin with transform method.
		strip({ include: ['./src/**/*.ts'] }),
		tsConfigPaths(),
		esbuild({ minify: true }),
		externals()
	]
});
