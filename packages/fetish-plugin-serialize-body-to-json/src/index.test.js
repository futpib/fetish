
const test = require('ava');

const FormData = require('form-data');

const { fetish } = require('fetish-nude');
const serializeBodyToJson = require('.');

test('plain js object body gets stringified', async t => {
	const body = {
		a: 1,
		b: 2,
	};
	await fetish.with(serializeBodyToJson)({
		body,
		fetch: (url, options) => {
			t.deepEqual(JSON.parse(options.body), body);
		},
	});
});

test('body instanceof FormData', async t => {
	const body = new FormData();

	await fetish.with(serializeBodyToJson)({
		body,
		fetch: (url, options) => {
			t.is(options.body, body);
		},
	});
});
