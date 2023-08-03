import fs from 'node:fs';
import { dirname, join, resolve as resolvePath } from 'path';
import { createMatchPath, loadConfig } from 'tsconfig-paths';
import { getFormat, load, resolve as resolveTs, transformSource } from 'ts-node/esm';
import { pathToFileURL } from 'url';
export { getFormat, load, transformSource };

const { absoluteBaseUrl, paths } = loadConfig();
const matchPath = createMatchPath(absoluteBaseUrl, paths);

/**
 * @param {string} path
 */
function isdir(path) {
	try {
		return fs.statSync(path).isDirectory();
	} catch (error) { }
	return false;
}

export function resolve(specifier, context, defaultResolver) {
	let mappedSpecifier = matchPath(specifier);
	if (!mappedSpecifier && specifier.startsWith('.')) {
		const baseUrl = context.parentURL || pathToFileURL('./src');
		const basePath = resolvePath(baseUrl.replace(/file:\/\//, ''));
		mappedSpecifier = join(dirname(basePath), specifier);
	}

	if (mappedSpecifier) {
		if (isdir(mappedSpecifier)) {
			specifier = join(mappedSpecifier, 'index.ts');
		} else if (!mappedSpecifier.match(/\.(j|t)s$/)) {
			specifier = `${mappedSpecifier}.ts`;
		}
	}

	return resolveTs(specifier, context, defaultResolver);
}
