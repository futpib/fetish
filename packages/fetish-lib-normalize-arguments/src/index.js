
module.exports = (urlOrOptions, undefinedOrOptions) => {
	if (typeof urlOrOptions === 'string') {
		return Object.assign({ url: urlOrOptions }, undefinedOrOptions);
	}

	return Object.assign({}, urlOrOptions);
};
