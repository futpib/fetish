
import test from 'ava';

import {fetish} from 'fetish-nude';
import baseUrl from '.';

test('merging relative url with base url', async t => {
	const base = 'https://user:pass@host:31337/basepath?a=base&b=base#hash';
	const relative = 'resource?b=rel&c=rel';

	await fetish.with(baseUrl(base))({
		url: relative,
		fetch: url => {
			t.is(url, 'https://user:pass@host:31337/basepath/resource?b=rel&c=rel#hash');
		}
	});
});

test('replacing base url with absolute url', async t => {
	const base = 'protocol://foo/bar?buz#hash';
	const absolute = 'http://host/foo';

	await fetish.with(baseUrl(base))({
		url: absolute,
		fetch: url => {
			t.is(url, absolute);
		}
	});
});

test('relative base url (base path)', async t => {
	const base = '/pets';
	const resource = '/cats?q=mittens';

	await fetish.with(baseUrl(base))({
		url: resource,
		fetch: url => {
			t.is(url, '/pets/cats?q=mittens');
		}
	});
});

test('no url option', async t => {
	const base = '/pets';

	await fetish.with(baseUrl(base))({
		fetch: url => {
			t.is(url, '/pets');
		}
	});
});
