const { updateScore } = require('../services/score');

const execute = (submissionId) => {
  return updateScore(submissionId);
};

exports.execute = execute;

module.exports = {
  execute
};
