import * as tsConfigPaths from 'tsconfig-paths';
import { getFormat, load, resolve as resolveTs, transformSource } from 'ts-node/esm';
export { getFormat, load, transformSource };

const { absoluteBaseUrl, paths } = tsConfigPaths.loadConfig();
const matchPath = tsConfigPaths.createMatchPath(absoluteBaseUrl, paths);

export function resolve(specifier, context, defaultResolver) {
	const mappedSpecifier = matchPath(specifier);
	if (mappedSpecifier) specifier = `${mappedSpecifier}.ts`;
	return resolveTs(specifier, context, defaultResolver);
}
