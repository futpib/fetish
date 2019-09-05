
const isObject = o => o && o.toString && (o.toString() === '[object Object]');

module.exports = oldFetish => options => oldFetish(
	isObject(options.body)
		? Object.assign({}, options, {
			body: JSON.stringify(options.body),
		})
		: options
);
