if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const { program } = require('commander');

program.requiredOption('-p, --payload <string>').requiredOption('-s, --script <string>');

program.parse();

const options = program.opts();

console.log(options.payload);
