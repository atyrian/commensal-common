module.exports = {
  aws: {
    lambdaWrapper: require('./src/aws/lambdaWrapper'),
    ServiceAuthorizer: require('./src/aws/serviceAuthorizer'),
    UserAuthorizer: require('./src/aws/userAuthorizer'),
  },
  errors: {
    HttpError: require('./src/errors').HttpError,
    MissingParameterError: require('./src/errors').MissingParameterError,
  },
};
