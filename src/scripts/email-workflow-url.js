const { sendMailViaNodemailer } = require('../services/nodemailer');

const execute = async (email, workflowUrl) => {
  await sendMailViaNodemailer({
    template: 'call_to_action',
    data: {
      header: 'Test Results',
      text: 'Click below to view your test execution results.',
      c2a_link: workflowUrl,
      c2a_button: 'View Workflow Run'
    },
    options: { to: email, subject: 'Bashaway submission test execution results' }
  });
};

exports.execute = execute;

module.exports = {
  execute
};
