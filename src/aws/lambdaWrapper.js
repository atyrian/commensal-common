const { HttpError } = require('../errors');

function lambdaWrapper(fn) {
  return (event, context, callback) => Promise.resolve()
    .then(() => fn(event))
    .then(response => callback(null, { statusCode: 200, body: response }))
    .catch((error) => {
      if (error instanceof HttpError) {
        callback(null,
          {
            statusCode: 200,
            body: JSON.stringify({ message: error.message, status: error.statusCode }),
          });
      } else {
        console.log('Error not instance of HTTP Error');
        console.log('Error:', error.stack);
        callback(new Error('Internal Server Error'));
      }
    });
}

module.exports = lambdaWrapper;
