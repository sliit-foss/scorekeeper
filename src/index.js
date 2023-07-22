if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const { program } = require('commander');

program
  .requiredOption('-s, --script <string>')
  .requiredOption('-p, --payload <string>')
  .option('-url, --workflow-url <string>');

program.parse();

const options = program.opts();

console.log(options.payload);

console.log(JSON.parse(options.payload));

if (options.script === 'email-workflow-url') {
  require('./scripts/email-workflow-url').execute(options.payload.email, options.workflowUrl);
} else {
  require('./scripts/update-scores').execute(options.payload.submission_id);
}
