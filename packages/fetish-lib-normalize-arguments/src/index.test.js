
const test = require('ava');

const normalizeArguments = require('.');

test('normalizeArguments', t => {
	t.deepEqual(normalizeArguments({ a: 1 }), { a: 1 });
	t.deepEqual(normalizeArguments('u', { a: 1 }), { url: 'u', a: 1 });
});
