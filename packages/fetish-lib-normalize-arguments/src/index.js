
module.exports = (urlOrPathnameOrOptions, undefinedOrOptions) => {
	if (typeof urlOrPathnameOrOptions === 'string') {
		return Object.assign({ url: urlOrPathnameOrOptions }, undefinedOrOptions);
	}

	if (Array.isArray(urlOrPathnameOrOptions)) {
		return Object.assign({ pathname: urlOrPathnameOrOptions }, undefinedOrOptions);
	}

	return Object.assign({}, urlOrPathnameOrOptions);
};
