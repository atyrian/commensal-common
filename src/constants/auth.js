const policyEffects = {
  get allow() {
    return 'Allow';
  },
  get deny() {
    return 'Deny';
  },
};

exports.constants = policyEffects;

const jwtOptions = {
  get allowedAlgorithms() {
    return ['RS256'];
  },
};

exports.constants = jwtOptions;
