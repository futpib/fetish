
const url = require('url');

module.exports = oldFetish => options => {
	const optionsUrl = url.parse(options.url || '', true);
	const optionsQuery = options.query || {};

	delete optionsUrl.search;
	optionsUrl.query = Object.assign({}, optionsUrl.query, optionsQuery);

	const newOptions = Object.assign({}, options, {
		url: url.format(optionsUrl),
	});

	delete newOptions.query;

	return oldFetish(newOptions);
};
