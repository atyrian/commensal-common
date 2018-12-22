const policyEffects = {
  get allow() {
    return 'Allow';
  },
  get deny() {
    return 'Deny';
  },
};

exports.policyEffects = policyEffects;

const jwtOptions = {
  get allowedAlgorithms() {
    return ['RS256'];
  },
};

exports.jwtOptions = jwtOptions;

const authorizerTypes = {
  get serviceAuthorizer() {
    return 'service';
  },
};

exports.authorizerTypes = authorizerTypes;
