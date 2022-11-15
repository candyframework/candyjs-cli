const { Command } = require('commander');
import { init } from './tasks/index';


const program = new Command();
program
    .name('candyjs-cli')
    .description('CLI to create basic candyjs project')
    .version('0.0.1');

program.command('init')
    .description('Initialize a project')
    .argument('<project-name>', 'The name of the project you want to create')
    .action((name: string) => {
        init(name)
    });

program.parse();
