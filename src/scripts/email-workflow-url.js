const { sendMailViaNodemailer } = require('../services/nodemailer');

const execute = (email, workflowUrl) => {
  return sendMailViaNodemailer({
    template: 'call_to_action',
    data: {
      header: 'Test Results',
      text: 'Click below to view your test execution results.',
      action_link: workflowUrl,
      action_text: 'View Workflow Run',
      disclaimer_text: "You've received this email because you have uploaded a submission to Bashaway 2023."
    },
    options: { to: email, subject: 'Bashaway submission test execution results' }
  }).catch((err) => {
    console.warn('Failed to email workflow link', err);
  });
};

exports.execute = execute;

module.exports = {
  execute
};
