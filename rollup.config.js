import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import strip from '@rollup/plugin-strip';
import path from 'path';
import { defineConfig } from 'rollup';
import esbuild from 'rollup-plugin-esbuild';
import externals from 'rollup-plugin-node-externals';
import { typescriptPaths } from 'rollup-plugin-typescript-paths';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.resolve(__dirname, 'dist');
const srcPath = path.resolve(__dirname, 'src', 'index.ts');

export default defineConfig({
	input: srcPath,
	output: {
		dir: distPath,
		name: 'index.js',
		format: 'cjs'
	},
	plugins: [
		commonjs(),
		esbuild({
			minify: true,
			target: 'esnext'
		}),
		externals(),
		resolve({ extensions: ['.js', '.json', '.mjs', '.node', '.ts'] }),
		strip({ include: ['**/*.ts'] }),
		typescriptPaths({ preserveExtensions: true })
	]
});
