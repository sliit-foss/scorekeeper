const serviceConnector = require('@sliit-foss/service-connector').default;

const connector = serviceConnector({
  baseURL: process.env.BASHAWAY_SERVER_URL,
  service: 'Bashaway-Server',
  headerIntercepts: () => ({
    'x-api-key': process.env.BASHAWAY_SERVER_API_KEY
  })
});

exports.updateScore = (id) => {
  return connector
    .patch(`/api/submissions/${id}`, {
      automatically_graded: true
    })
    .then(connector.resolve);
};
