
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
		'put'
	].forEach(method => {
		methods[method] = function (options) {
			// FIXME: This code duplicates `normalizeOptions`
			if (typeof options === 'string') {
				options = {url: options};
			}
			return this(Object.assign({
				method
			}, options));
		};
	});

	return methods;
})();

module.exports = old => Object.assign(old, methods);
