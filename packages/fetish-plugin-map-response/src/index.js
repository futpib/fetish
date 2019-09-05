
module.exports = mapper => oldFetish => options => oldFetish(options).then(response => mapper(response));
