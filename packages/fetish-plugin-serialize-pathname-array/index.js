
const url = require('url');

module.exports = oldFetish => options => {
	if (!options.pathname || !Array.isArray(options.pathname)) {
		return oldFetish(options);
	}

	const optionsUrl = url.parse(options.url || '');

	delete optionsUrl.path;
	optionsUrl.pathname = (optionsUrl.pathname || '')
		.split('/')
		.concat(options.pathname.map(encodeURIComponent))
		.join('/');

	return oldFetish(Object.assign({}, options, {
		url: url.format(optionsUrl),
		pathname: undefined
	}));
};
