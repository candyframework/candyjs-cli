#!/usr/bin/env node

const download = require('download-git-repo');
const { program } = require('commander');

// candyjs-cli init --type=ts
program
    .name('candyjs-cli')
    .description('CLI to init candyjs program')
    .version('0.0.1');

program.command('init')
    .description('Create project')
    .option('--ts', 'Create typescript program')
    .option('--cjs', 'Create commonjs program')
    .action((opt) => {
        // default to ts
        if(!opt.cjs) {
            opt.ts = true;
        }

        if(opt.ts) {
            genTsPro();

        } else if(opt.cjs) {
            genCjsPro();
        }
    });
    
program.parse();

function genTsPro() {
    download('direct:https://github.com/candyframework/basic-demo-ts/archive/refs/heads/main.zip', 'project', (err) => {
        console.log(err ? err : 'done')
    });
}

function genCjsPro() {
    download('direct:https://github.com/candyframework/basic-demo-cjs/archive/refs/heads/main.zip', 'project', (err) => {
        console.log(err ? err : 'done')
    });
}