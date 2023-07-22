if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const { program } = require('commander');

program
  .requiredOption('-s, --script <string>')
  .option('-e, --email <string>')
  .option('-url, --workflow-url <string>')
  .option('-s, --submission-id <string>');

program.parse();

const options = program.opts();

(async () => {
  if (options.script === 'email-workflow-url') {
    await require('./scripts/email-workflow-url').execute(options.email, options.workflowUrl);
  } else {
    require('./scripts/update-scores').execute(options.submissionId);
  }
  process.exit(0);
})();
