
const normalizeArguments = require('fetish-lib-normalize-arguments');

const methods = (() => {
	const methods = {};

	for (const method of [
		'connect',
		'delete',
		'get',
		'head',
		'options',
		'patch',
		'post',
		'put',
	]) {
		methods[method] = function (...args) {
			const options = normalizeArguments(...args);
			return this(Object.assign({
				method,
			}, options));
		};
	}

	return methods;
})();

module.exports = old => Object.assign(old, methods);
