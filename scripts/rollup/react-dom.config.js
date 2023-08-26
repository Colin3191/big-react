import { getPackageJSON, resolvePkgPath, getBaseRollupPlugins } from './utils';
import generatePackageJSON from 'rollup-plugin-generate-package-json';
import alias from '@rollup/plugin-alias';

const { module, name } = getPackageJSON('react-dom');

// 包路径
const pkgPath = resolvePkgPath(name);
//产物路径
const distPath = resolvePkgPath(name, true);

export default [
	// react-dom
	{
		input: `${pkgPath}/${module}`,
		output: [
			{
				file: `${distPath}/index.js`,
				name: 'ReactDOM',
				format: 'umd'
			},
			{
				file: `${distPath}/client.js`,
				name: 'ReactDOM',
				format: 'umd'
			}
		],
		plugins: [
			...getBaseRollupPlugins(),
			// webpack resolve alias
			alias({
				entries: {
					hostConfig: `${pkgPath}/src/hostConfig.ts`
				}
			}),
			generatePackageJSON({
				inputFolder: pkgPath,
				outputFolder: distPath,
				baseContents: ({ name, description, version }) => ({
					name,
					description,
					version,
					peerDependencies: {
						react: version
					},
					main: 'index.js'
				})
			})
		]
	}
];
