import { program } from 'commander';
import print from './commands/print.js'
import register from './commands/register.js'
import balance from './commands/balance.js'
// Program version
program.version('0.0.1');

// Commands
program
  .command('print').description("Print command")
  .option('-f, --file <args>', 'File flag')
  .action(print);

program
    .command('register')
    .option('-f, --file <args>', 'File flag')
    .action(register)

program
    .command('balance')
    .option('-f, --file <args>', 'File flag')
    .action(balance)


program.parse();