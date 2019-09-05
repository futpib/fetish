
const { fetish: fetishNude } = require('fetish-nude');

const mapOptions = require('fetish-plugin-map-options');
const mapResponse = require('fetish-plugin-map-response');

const baseUrl = require('fetish-plugin-base-url');
const defaultHeaders = require('fetish-plugin-default-headers');

const throwHttpErrors = require('fetish-plugin-throw-http-errors');

const customFetch = require('fetish-plugin-custom-fetch');
const customPromise = require('fetish-plugin-custom-promise');

const serializePathnameArray = require('fetish-plugin-serialize-pathname-array');
const serializeQuery = require('fetish-plugin-serialize-query');
const serializeBodyToJson = require('fetish-plugin-serialize-body-to-json');

const fetchDropIn = require('fetish-plugin-fetch-drop-in');
const httpMethods = require('fetish-plugin-http-methods');

const multicastResponse = require('fetish-plugin-multicast-response');

const fetish = fetishNude
	.with(serializePathnameArray)
	.with(serializeQuery)
	.with(serializeBodyToJson)
	.with(fetchDropIn)
	.with(httpMethods);

module.exports = {
	fetish,

	mapOptions,
	mapResponse,

	baseUrl,
	defaultHeaders,

	throwHttpErrors,

	customFetch,
	customPromise,

	serializePathnameArray,
	serializeQuery,
	serializeBodyToJson,

	fetchDropIn,
	httpMethods,

	multicastResponse,
};
