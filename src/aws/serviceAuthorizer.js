const AWS = require('aws-sdk');
const jwt = require('jsonwebtoken');
const BaseAuthorizer = require('./baseAuthorizer');
const { policyEffects, jwtOptions, authorizerTypes } = require('../constants/auth');

class ServiceAuthorizer extends BaseAuthorizer {
  constructor(event) {
    super();
    this.event = event;
    this.ssm = new AWS.SSM();
  }

  async authorize() {
    const policyEffect = await this.validateToken(this.event.authorizationToken);
    const policy = super.generatePolicy('service', policyEffect);
    return policy;
  }

  validateToken(authorizationToken) {
    return new Promise(async (resolve) => {
      this.token = authorizationToken.replace(/Bearer/g, '').trim();
      const cert = await this.ssm.getParameters({ Names: ['jwtRS256.key.pub'] }).promise();
      jwt.verify(this.token, cert.Parameters[0].Value, { algorithms: jwtOptions.allowedAlgorithms },
        (err, res) => {
          if (err) {
            console.log('Validation Error:', err);
            return resolve(policyEffects.deny);
          }
          if (res.aut === authorizerTypes.serviceAuthorizer) {
            return resolve(policyEffects.allow);
          }
          return resolve(policyEffects.deny);
        });
    });
  }
}

module.exports = ServiceAuthorizer;
