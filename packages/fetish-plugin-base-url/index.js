
const url = require('url');

function isAbsolute(url) {
	return url.host;
}

module.exports = baseUrl => {
	baseUrl = url.parse(baseUrl);

	return oldFetish => options => {
		const optionsUrl = url.parse(options.url);

		const resultUrl = (isAbsolute(optionsUrl) && isAbsolute(baseUrl)) ? optionsUrl : {
			protocol: optionsUrl.protocol || baseUrl.protocol,
			auth: optionsUrl.auth || baseUrl.auth,
			host: optionsUrl.host || baseUrl.host,
			search: optionsUrl.search || baseUrl.search,
			hash: optionsUrl.hash || baseUrl.hash,
			pathname: [
				(baseUrl.pathname || ''),
				(optionsUrl.pathname || '')
			].join('/').replace(/\/{2,}/g, '/')
		};

		return oldFetish(Object.assign({}, options, {
			url: url.format(resultUrl)
		}));
	};
};
