
import test from 'ava';

import {fetish, baseUrl, defaultHeaders} from '.';

test.todo('All examples from readme');

test('intro example', async t => {
	const client = fetish
		.with(baseUrl('http://example.org/api/v2'))
		.with(defaultHeaders({
			'X-API-Key': 'secret'
		}));

	await client.post('/posts', {
		body: {
			title: 'me',
			body: 'likey'
		},
		fetch: (url, options) => {
			t.is(url, 'http://example.org/api/v2/posts');
			t.is(options.method, 'post');
			t.is(options.body, '{"title":"me","body":"likey"}');
		}
	});
});
