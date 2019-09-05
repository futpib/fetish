
module.exports = mapper => oldFetish => options => {
	return oldFetish(mapper(options));
};
