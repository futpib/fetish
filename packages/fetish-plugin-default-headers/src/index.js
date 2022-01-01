
module.exports = defaultHeaders => oldFetish => options => oldFetish(Object.assign({}, options, {
	headers: Object.assign({}, defaultHeaders, options.headers),
}));
