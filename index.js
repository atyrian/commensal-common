module.exports = {
  aws: {
    lambdaWrapper: require('./src/aws/lambdaWrapper'),
    ServiceAuthorizer: require('./src/aws/serviceAuthorizer'),
  },
  errors: {
    HttpError: require('./src/errors').HttpError,
    MissingParameterError: require('./src/errors').MissingParameterError,
  },
};
