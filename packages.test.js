const fs = require('fs');

const test = require('ava');

const { omit, last } = require('ramda');
const globby = require('globby');

test('all `package.json`s are equal except name, deps and stuff', async t => {
	const packageJsonFiles = await globby('./packages/*/package.json');
	const packages = packageJsonFiles
		.map(x => require(x))
		.map(omit([
			'name',
			'version',
			'description',
			'dependencies',
			'devDependencies',
			'peerDependencies',
		]));

	for (const package_ of packages) {
		t.deepEqual(package_, packages[0]);
	}
});

const excludedPlugins = new Set([
	'fetish-plugin-immutable-response', // Would've shown `missing peer \`immutable\` dependency` warning to all users
]);

test('every plugin (with some exceptions) is imported in `fetish-peer` and is it’s dependency', t => {
	const source = fs.readFileSync('./packages/fetish-peer/src/index.js', 'utf8');

	const plugins = fs.readdirSync('./packages/')
		.map(path => path.split('/'))
		.map(x => last(x))
		.filter(name => name.startsWith('fetish-plugin-'))
		.filter(name => !excludedPlugins.has(name));

	for (const plugin of plugins) {
		t.true(source.includes(plugin), `\`${plugin}\` is not mentioned in \`fetish-peer\``);
	}
});
