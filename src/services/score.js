const serviceConnector = require('@sliit-foss/service-connector');

const connector = serviceConnector({
  baseURL: process.env.BASHAWAY_SERVER_URL,
  service: 'Bashaway-Server'
});

exports.updateScore = (id) => {
  return connector.post(`/api/submissions/${id}`).then(connector.resolve);
};
