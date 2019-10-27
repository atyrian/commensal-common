const AWS = require('aws-sdk');
const jwt = require('jsonwebtoken');
const BaseAuthorizer = require('./baseAuthorizer');
const { policyEffects, jwtOptions, authorizerTypes } = require('../constants/auth');

class UserAuthorizer extends BaseAuthorizer {
  constructor(event) {
    super();
    this.event = event;
    const [, path] = event.methodArn.split(/(?<=id\/)/);
    if (path) {
      const [id] = path.split('/');
      this.id = id;
    } else {
      this.id = 0;
    }
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
          if (res.aut === authorizerTypes.userAuthorizer
            && parseInt(res.sub, 10) === parseInt(this.id, 10)) {
            return resolve(policyEffects.allow);
          }
          return resolve(policyEffects.deny);
        });
    });
  }
}

module.exports = UserAuthorizer;
