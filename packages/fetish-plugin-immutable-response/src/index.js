
const {fromJS} = require('immutable');

module.exports = oldFetish => options => oldFetish(options).then(response => {
	response.immutable = () => response.json().then(fromJS);
	return response;
});
