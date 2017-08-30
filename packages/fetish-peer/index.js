
const {fetish: fetishNude} = require('fetish-nude');

const baseUrl = require('fetish-plugin-base-url');
const defaultHeaders = require('fetish-plugin-default-headers');

const customFetch = require('fetish-plugin-custom-fetch');
const customPromise = require('fetish-plugin-custom-promise');

const serializeQuery = require('fetish-plugin-serialize-query');
const serializeBodyToJson = require('fetish-plugin-serialize-body-to-json');

const fetchDropIn = require('fetish-plugin-fetch-drop-in');
const httpMethods = require('fetish-plugin-http-methods');

const multicastResponse = require('fetish-plugin-multicast-response');

const fetish = fetishNude
	.with(serializeQuery)
	.with(serializeBodyToJson)
	.with(fetchDropIn)
	.with(httpMethods)
;

module.exports = {
	fetish,

	baseUrl,
	defaultHeaders,

	customFetch,
	customPromise,

	fetchDropIn,
	httpMethods,

	multicastResponse
};
