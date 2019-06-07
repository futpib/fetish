
const url = require('url');

module.exports = oldFetish => options => {
	if (!options.pathname || !Array.isArray(options.pathname)) {
		return oldFetish(options);
	}

	const optionsUrl = url.parse(options.url || '');

	delete optionsUrl.path;
	optionsUrl.pathname = (optionsUrl.pathname || '')
		.split('/')
		.filter((value, index) => value || index === 0)
		.concat(options.pathname.map(encodeURIComponent))
		.join('/');

	const newOptions = Object.assign({}, options, {
		url: url.format(optionsUrl),
	});

	delete newOptions.pathname;

	return oldFetish(newOptions);
};
