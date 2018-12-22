const AWS = require('aws-sdk');
const jwt = require('jsonwebtoken');
const BaseAuthorizer = require('./baseAuthorizer');

class ServiceAuthorizer extends BaseAuthorizer {
  constructor(event) {
    super();
    this.event = event;
  }

  authorize() {
    return new Promise((resolve) => {
      console.log('Running Service Authorizer');
      const token = this.event.authorizationToken;
      console.log('this was token:', token);
      const response = super.generatePolicy('service', 'Allow');
      console.log('super response:', response);
      this.validateToken(token);
      resolve(response);
    });
  }

  async validateToken(authorizationToken) {
    this.token = authorizationToken.replace(/Bearer/g, '').trim();
    const ssm = new AWS.SSM();
    const cert = await ssm.getParameters({ Names: ['jwtRS256.key.pub'] }).promise();
    console.log('cert was this =>', cert);
    jwt.verify(this.token, cert, { algorithms: ['RS256'] }, (err, res) => {
      if (err) {
        console.log('Error decoding:', err);
      }
      console.log('response =>', res);
    });
  }
}

module.exports = ServiceAuthorizer;
