
module.exports = defaultHeaders => oldFetish => options => {
	return oldFetish(Object.assign({}, options, {
		headers: Object.assign({}, defaultHeaders, options.headers)
	}));
};
