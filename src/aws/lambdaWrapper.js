const { HttpError } = require('../errors');

function lambdaWrapper(fn) {
  return (event, context, callback) => Promise.resolve()
    .then(() => fn(event))
    .then(response => callback(null, response))
    .catch((error) => {
      if (error instanceof HttpError) {
        callback(null,
          { body: JSON.stringify({ message: error.message, code: error.statusCode }) });
      } else {
        console.log('Error not instance of HTTP Error');
        console.log('Error:', error.stack);
        callback(null,
          { body: JSON.stringify({ message: 'Internal Server Error', code: 500 }) });
      }
    });
}

module.exports = lambdaWrapper;
