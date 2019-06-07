
import test from 'ava';

import { fetish, baseUrl, defaultHeaders, customFetch } from '.';

test.todo('All examples from readme');

test('intro example', async t => {
	const client = fetish
		.with(baseUrl('http://example.org/api/v2'))
		.with(defaultHeaders({
			'X-API-Key': 'secret',
		}));

	await client.post('/posts', {
		body: {
			title: 'me',
			body: 'likey',
		},
		fetch: (url, options) => {
			t.is(url, 'http://example.org/api/v2/posts');
			t.is(options.method, 'post');
			t.is(options.body, '{"title":"me","body":"likey"}');
		},
	});
});

test('`baseUrl` + `serializePathnameArray`', async t => {
	const client = fetish
		.with(baseUrl('http://example.org/api/v2'));

	await client({
		pathname: [ 'foo' ],
		fetch: url => {
			t.is(url, 'http://example.org/api/v2/foo');
		},
	});
});

test('`fetchDropIn` + `serializePathnameArray`', async t => {
	const expectedArgs = [ '/pets/cats', { method: 'get' } ];

	const fetch = (...actualArgs) => t.deepEqual(actualArgs, expectedArgs);

	await fetish
		.with(customFetch(fetch))
		.get([ 'pets', 'cats' ]);
});

test('`fetchDropIn` + `baseUrl` + `serializePathnameArray`', async t => {
	const expectedArgs = [ 'https://zoo.example.org/pets/cats', { method: 'get' } ];

	const fetch = (...actualArgs) => t.deepEqual(actualArgs, expectedArgs);

	await fetish
		.with(baseUrl('https://zoo.example.org'))
		.with(customFetch(fetch))
		.get([ 'pets', 'cats' ]);
});

test('`fetchDropIn` + `baseUrl` + `serializePathnameArray` (with pathname in base url)', async t => {
	const expectedArgs = [ 'https://zoo.example.org/v1/pets/cats', { method: 'get' } ];

	const fetch = (...actualArgs) => t.deepEqual(actualArgs, expectedArgs);

	await fetish
		.with(baseUrl('https://zoo.example.org/v1'))
		.with(customFetch(fetch))
		.get([ 'pets', 'cats' ]);
});
