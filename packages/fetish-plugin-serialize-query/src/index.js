
const url = require('url');

module.exports = oldFetish => options => {
	const optionsUrl = url.parse(options.url || '', true);
	const optionsQuery = options.query || {};

	delete optionsUrl.search;
	optionsUrl.query = Object.assign({}, optionsUrl.query, optionsQuery);

	return oldFetish(Object.assign({}, options, {
		url: url.format(optionsUrl),
		query: undefined
	}));
};
