class HttpError extends Error {
  constructor(message, code) {
    super(message);
    this.statusCode = code;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, HttpError);
    }
  }
}

exports.HttpError = HttpError;

class MissingParameterError extends Error {
  constructor(param) {
    super(`Missing parameter: ${param}`);
    this.statusCode = 400;
  }
}

exports.MissingParameterError = MissingParameterError;
