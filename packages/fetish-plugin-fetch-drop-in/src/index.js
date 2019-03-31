
module.exports = old => Object.assign(old, {
	fetch(url, options) {
		return this(Object.assign({ url }, options));
	},
});
