import test from 'ava';

import { omit } from 'ramda';
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
