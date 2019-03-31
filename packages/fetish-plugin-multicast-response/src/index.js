
const NULL = {};

const bodyMethods = [
	// https://developer.mozilla.org/en-US/docs/Web/API/Response#Methods
	'arrayBuffer',
	'blob',
	'formData',
	'json',
	'text',
	// `fetish-plugin-immutable-response`
	'immutable'
];

module.exports = oldFetish => options => oldFetish(options).then(response => {
	bodyMethods.forEach(method => {
		if (!(method in response)) {
			return;
		}
		const parse = response[method].bind(response);
		let cache = NULL;
		response[method] = () => {
			if (cache === NULL) {
				cache = parse();
			}
			return cache;
		};
	});
	return response;
});
