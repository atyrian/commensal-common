module.exports = {
  aws: {
    lambdaWrapper: require('./src/aws/lambdaWrapper'),
  },
  errors: {
    HttpError: require('./src/errors').HttpError,
    MissingParameterError: require('./src/errors').MissingParameterError,
  },
};
