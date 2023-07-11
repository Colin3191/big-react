import { getPackageJSON, resolvePkgPath, getBaseRollupPlugins } from './utils';
import generatePackageJSON from 'rollup-plugin-generate-package-json';

const { module } = getPackageJSON('react');

// 包路径
const pkgPath = resolvePkgPath('react');
//产物路径
const distPath = resolvePkgPath('react', true);

export default [
	// react
	{
		input: `${pkgPath}/${module}`,
		output: {
			file: `${distPath}/index.js`,
			name: 'react',
			format: 'umd'
		},
		plugins: [
			...getBaseRollupPlugins(),
			generatePackageJSON({
				inputFolder: pkgPath,
				outputFolder: distPath,
				baseContents: ({ name, description, version }) => ({
					name,
					description,
					version,
					main: 'index.js'
				})
			})
		]
	},
	// jsx
	{
		input: `${pkgPath}/src/jsx.ts`,
		output: [
			// jsx-runtime
			{
				file: `${distPath}/jsx-runtime.js`,
				name: 'jsx',
				format: 'umd'
			},
			// jsx-dev-runtime
			{
				file: `${distPath}/jsx-dev-runtime.js`,
				name: 'jsx',
				format: 'umd'
			}
		],
		plugins: getBaseRollupPlugins()
	}
];
