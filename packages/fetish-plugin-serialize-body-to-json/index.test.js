
import test from 'ava';

import {fetish} from 'fetish-nude';
import serializeBodyToJson from '.';

test(async t => {
	const body = {
		a: 1,
		b: 2
	};
	await fetish.with(serializeBodyToJson)({
		body,
		fetch: (url, options) => {
			t.deepEqual(JSON.parse(options.body), body);
		}
	});
});
