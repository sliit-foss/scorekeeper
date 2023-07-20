const { program } = require('commander');

program
    .option('-p, --payload <string>');

program.parse();

const options = program.opts();

console.log(options.payload);

console.error('Mock failure');

process.exit(1);