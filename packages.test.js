import fs from 'fs';

import test from 'ava';

import { omit, last } from 'ramda';
import globby from 'globby';

test('all `package.json`s are equal except name, deps and stuff', async t => {
	const packages = (await globby('./packages/*/package.json'))
		.map(require)
		.map(omit([
			'name',
			'description',
			'dependencies',
			'devDependencies',
			'peerDependencies',
		]));

	packages.forEach(package_ => {
		t.deepEqual(package_, packages[0]);
	});
});

const excludedPlugins = new Set([
	'fetish-plugin-immutable-response', // Would've shown `missing peer \`immutable\` dependency` warning to all users
]);

test('every plugin (with some exceptions) is imported in `fetish-peer` and is it\'s dependency', t => {
	const source = fs.readFileSync('./packages/fetish-peer/src/index.js', 'utf8');

	const plugins = fs.readdirSync('./packages/')
		.map(path => path.split('/'))
		.map(last)
		.filter(name => name.startsWith('fetish-plugin-'))
		.filter(name => !excludedPlugins.has(name));

	plugins.forEach(plugin => {
		t.true(source.includes(plugin), `\`${plugin}\` is not mentioned in \`fetish-peer\``);
	});
});
