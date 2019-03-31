
import test from 'ava';

import normalizeArguments from '.';

test('normalizeArguments', t => {
	t.deepEqual(normalizeArguments({ a: 1 }), { a: 1 });
	t.deepEqual(normalizeArguments('u', { a: 1 }), { url: 'u', a: 1 });
});
