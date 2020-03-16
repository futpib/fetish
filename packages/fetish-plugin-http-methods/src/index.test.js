
const test = require('ava');

const { fetish } = require('fetish-nude');
const fetishMethods = require('.');

const methods = [
	'connect',
	'delete',
	'get',
	'head',
	'options',
	'patch',
	'post',
	'put',
];

const requestMacro = async (t, method) => {
	t.plan(2);

	const fetch = (url, options) => {
		t.is(url, 'test');
		t.deepEqual(options, { method });
	};

	await fetish.with(fetishMethods)[method]({
		url: 'test',
		fetch,
	});
};

const requestTwoArgMacro = async (t, method) => {
	t.plan(2);

	const fetch = (url, options) => {
		t.is(url, 'test');
		t.deepEqual(options, { method });
	};

	await fetish.with(fetishMethods)[method]('test', {
		fetch,
	});
};

methods.forEach(method => {
	test(`’${method}’ some`, requestMacro, method);
	test(`’${method}’ some with 2 arguments`, requestTwoArgMacro, method);
});
