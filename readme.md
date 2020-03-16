# fetish

> Fetch the way you desire

[![Build Status](https://travis-ci.org/futpib/fetish.svg?branch=master)](https://travis-ci.org/futpib/fetish) [![Coverage Status](https://coveralls.io/repos/github/futpib/fetish/badge.svg?branch=master)](https://coveralls.io/github/futpib/fetish?branch=master) [![Dependency Status](https://dependencyci.com/github/futpib/fetish/badge)](https://dependencyci.com/github/futpib/fetish) [![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo) [![Gitter](https://badges.gitter.im/join_chat.svg)](https://gitter.im/futpib-fetish)

## Why fetish?

- [Drop-in fetch replacement](#drop-in-fetch-replacement)
- [No fetch quirks](#no-fetch-quirks)
- [Plugins and middlewares](#plugins-and-middlewares)
- [Use out of the box](#out-of-the-box)
- [Pick the features you need](#custom-anything)
- [Customize anything](#custom-plugins)

## Example

```js
import {fetish, baseUrl, defaultHeaders} from 'fetish';

const client = fetish
	.with(baseUrl('http://example.org/api/v2'))
	.with(defaultHeaders({
		'X-API-Key': 'secret'
	}));

client.post('/posts', {
	body: {
		title: 'me',
		body: 'likey'
	}
});
```

## Usage

### Out of the Box

```
npm i fetish
```

Or, if you prefer, with [Yarn](https://yarnpkg.com/):

```
yarn add fetish
```

Boxed fetish pulls in [isomorphic-fetch](https://github.com/matthew-andrews/isomorphic-fetch) and [es6-promise](https://github.com/stefanpenner/es6-promise) polyfills, but of course [you can override both of those](#custom-promise), use [`fetish-peer` (with peer dependency)](#fetish-with-peer-dependencies) or even [pick and choose features you want with `fetish-nude`](#custom-anything).

#### Custom Promise

```js
import {fetish, customPromise} from 'fetish';
import Promise from 'bluebird';

const client = fetish.with(customPromise(Promise));

client('/too-fast').delay(100); // use bluebird's promise methods
```

#### Custom fetch

```js
import {fetish, customFetch} from 'fetish';
import fetch from 'fetch-ie8';

const client = fetish.with(customFetch(fetch));
```


### Custom Anything

Here is a glimpse of how fetish is implemented. It starts with [fetish-nude](https://github.com/futpib/fetish/tree/master/packages/fetish-nude) which is a simple wrapper around fetch with only one extra method called `with` used to add plugins. Plugins, which are just functions from one fetish to a better fetish, are then added to it.

Let's build a barebone http client with only one added feature: it will `JSON.stringify` the request body.

```
npm i fetish-nude fetish-plugin-fetish-plugin-serialize-body-to-json
```

```js
exports.fetish = fetishNude
	.with(serializeBodyToJson);
```

If none of the [existing plugins](https://www.npmjs.com/search?q=fetish-plugin-*) suits your fancy, [creating a custom plugin](#custom-plugins) is trivial.


### Fetish with peer dependencies

If you don't want to use `isomorphic-fetch` or `es6-promise` polyfills that come as dependencies with the `fetish` package, use `fetish-peer` instead.

Obviously, if you choose `fetish-peer` package, it is expected that your runtime has native fetch and Promise support or that you install fetch and Promise polyfills of your choice separately.

## Plugins and Middlewares

Plugins are middlewares. Whoa, right?

The complete list can be found in [packages](https://github.com/futpib/fetish/tree/master/packages/) directory and [on npm](https://www.npmjs.com/search?q=keywords:fetish).

#### Drop-in fetch replacement

`fetish.fetch` tries to be as `fetch`-compatible as it can.

If you are [going full custom](#custom-anything) and need this, use `fetish-plugin-fetch-drop-in`.

### No fetch quirks

What quirks? Fetch is awesome, right? Almost right.

#### Multiple consumers of a Response

While Promise is [multicast](https://github.com/kriskowal/gtor#singular-and-plural), [Response](https://developer.mozilla.org/en-US/docs/Web/API/Response) is not. You can pass a promise to as many consumers as you like and they can call `promise.then` multiple times, but while you can pass a response to many consumers, only the first call of `response.json()` can ever be successful. There are [good reasons for that](https://github.com/whatwg/fetch/issues/196#issuecomment-171935172), but there are also good reasons not to want that.

This is precisely what `fetish-plugin-multicast-response` fixes by monkey-patching all stream-reading methods. Unfortunately, if you try to read a response body in multiple ways (like doing `r.json()` and then also `r.text()`) you'd still get an error.

### Custom Plugins

Fetish plugins are functions from one fetish to a better fetish. And fetish is a function from request options to a Promise of a Response. This gives plugins the power to change anything about fetish: options, response or the fetish function itself.

Approximate type signature:

```js
type Options = { /* url, body, query, headers, etc. */ };
type Fetish = Options => Promise<Response>;
type Plugin = Fetish => Fetish;
```

#### Simplest possible plugin

This plugin changes nothing about the fetish, but hopefully serves as a good first example.

```js
const identity = nextFetish => options => nextFetish(options).then(response => response);
const client = fetish.with(identity);
```

You can see from this example and the types above that plugins can easily implement middlewares in this setting.

#### Transforming request

Say you want to add a custom header to every request. You could use `fetch-plugin-default-options`, but we will do it the hard way instead.

```js
import {defaultsDeep} from 'lodash/fp';

// Easy mode
const myHeaders = nextFetish => options => {
	return nextFetish(defaultsDeep(options, {
		headers: {
			'X-Hello': 'World'
		}
	}));
};

// A bit more generic
const defaultHeaders = headers => nextFetish => options => nextFetish(defaultsDeep(options {headers}));

const client = fetish
	.with(myHeaders)
	.with(defaultHeaders({
		'X-Beep': 'Boop'
	}));
```

#### Transforming response

Let's make a plugin that lets one parse a response into an [immutable.js](https://github.com/facebook/immutable-js) object. The real implementation is called `fetish-plugin-immutable-response`.

We are going to add `response.immutable()` method as a simple wrapper around `response.json()`.

Generally, actually modifying responses is a bit tricky because of the way [Response](https://developer.mozilla.org/en-US/docs/Web/API/Response) is defined. It's immutable and it does not define any "copying setter" methods. One could use [`new Response()`](https://developer.mozilla.org/en-US/docs/Web/API/Response/Response), but in reality I would prefer monkey-patching the response anyway (sorry).

```js
import {fromJS} from 'immutable';

const immutable = nextFetish => options => nextFetish(options).then(response => {
	response.immutable = () => response.json().then(fromJS);
	return response;
});

const client = fetish.with(immutable);

// Somewhere else:
const treasure = await client('/treasure/1').then(r => r.immutable());
```

Note that you can just as easily throw an error from the `.then` callback of your plugin. This way you can turn erroneous responses into exceptions, and that's actually what `fetish-plugin-throw-http-errors` does. Or use `.catch` in a simillar way, maybe you want to recover from errors, whatever, you got the point.

#### Adding new methods

How do you add custom methods like `fetch.post` though?

```js
const postMethod = nextFetish => Object.assign(nextFetish, {
	post: function (options) {
		// `this` here will be the final fetish someone calls like `fetish.post(...)`
		return this(Object.assign({}, options, {
			method: 'POST'
		}));
	}
});

const client = fetish.with(postMethod);

// Later:
const response = await client.post({
	url: '/posts/',
	body: { i: 'post' }
});
```

But of cource this basic stuff is already impletemented in `fetish-plugin-http-methods`. Hope you come up with something more exciting!

#### Be nice :3

Consider contributing you plugins and stuff to this repo.

If you deicide to publish your plugins to npm separately from this repo, please try to be careful about the "fetish-*" namespace-like thingy.

## Contributing

1. Fork this
2. Add a package under packages
3. Code
4. Use [ava](https://github.com/avajs/ava) for tests and [xo](https://github.com/sindresorhus/xo) for linting
5. Submit a pull request

## Prior art / inspirations / alternatives

### Fetch-compatible

- [fetch-plus](https://github.com/RickWong/fetch-plus)
- [fetch-it](https://github.com/tryolabs/fetch-it)

### Other

- [axios](https://github.com/mzabriskie/axios)
- [got](https://github.com/sindresorhus/got)
- [request](https://github.com/request/request)
- [reqwest](https://github.com/ded/reqwest)
- [superagent](https://github.com/visionmedia/superagent)
