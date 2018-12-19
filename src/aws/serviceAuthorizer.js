const BaseAuthorizer = require('./baseAuthorizer');

class ServiceAuthorizer extends BaseAuthorizer {
  constructor(event) {
    super();
    this.event = event;
  }

  authorize() {
    return new Promise((resolve, reject) => {
      console.log('Running Service Authorizer');
      const token = this.event.authorizationToken;
      console.log('this was token:', token);
      const response = super.generatePolicy('service', 'Allow');
      console.log('super response:', response);
      resolve(response);
    });
  }
}

module.exports = ServiceAuthorizer;

