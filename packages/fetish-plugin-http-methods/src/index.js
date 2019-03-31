
const normalizeArguments = require('fetish-lib-normalize-arguments');

const methods = (() => {
	const methods = {};

	[
		'connect',
		'delete',
		'get',
		'head',
		'options',
		'patch',
		'post',
		'put',
	].forEach(method => {
		methods[method] = function (...args) {
			const options = normalizeArguments(...args);
			return this(Object.assign({
				method,
			}, options));
		};
	});

	return methods;
})();

module.exports = old => Object.assign(old, methods);
