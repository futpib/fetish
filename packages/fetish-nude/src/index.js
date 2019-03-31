
// eslint-disable-next-line no-restricted-globals
const defaultFetch = (typeof fetch === 'undefined' ? undefined : fetch);
// eslint-disable-next-line no-restricted-globals
const defaultPromise = (typeof Promise === 'undefined' ? undefined : Promise);

const normalizeArguments = require('fetish-lib-normalize-arguments');

const fetish = (...args) => {
	const options = normalizeArguments(...args);

	const fetch = options.fetch || defaultFetch;
	const Promise = options.Promise || defaultPromise;

	const url = options.url || '';

	delete options.fetch;
	delete options.Promise;

	delete options.url;

	return Promise.resolve(fetch(url, options));
};

fetish.with = function (plugin) {
	const oldFetish = Object.assign(options => this(options), this);
	const newFetish = plugin(oldFetish);
	return Object.assign(
		(...args) => {
			const options = normalizeArguments(...args);
			const result = newFetish(options);

			if (!result || typeof result.then !== 'function') {
				const e = new Error([
					'A plugin did not return a promise,',
					'expected `Promise<Response>`, instead got:',
					String(result),
				].join(' '));
				e.actual = result;
				e.plugin = plugin;
				throw e;
			}

			return result;
		},
		oldFetish,
		newFetish
	);
};

module.exports = {
	fetish,
};
