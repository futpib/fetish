
module.exports = oldFetish => options => oldFetish(Object.assign({}, options, {
	body: JSON.stringify(options.body)
}));
