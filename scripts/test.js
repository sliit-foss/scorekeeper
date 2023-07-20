const { program } = require('commander');

program
    .option('-p, --payload <string>');

program.parse();

const options = program.opts();

console.log(options.payload);