const { Select, prompt } = require('enquirer');
const download = require('download-git-repo');
const path = require('path');
const { existsSync } = require('fs');
import { start, stop } from '../../utils/loading';

const config: any = {
    'basic-typescript': 'direct:https://github.com/candyframework/basic-demo-ts/archive/refs/heads/main.zip',
    'basic-commonjs': 'direct:https://github.com/candyframework/basic-demo-cjs/archive/refs/heads/main.zip'
};

const load = (projectName: string, type: string) => {
    let url = config[type];

    start();
    download(url, projectName, (err: any) => {
        stop();
        console.log(err ? err : 'done')
    });
};

const selectTemplate = (projectName: string) => {
    const prompt = new Select({
        name: 'select',
        message: 'Pick a project template',
        choices: ['basic-typescript', 'basic-commonjs']
    });

    prompt.run()
        .then((answer: string) => {
            load(projectName, answer);
        })
        .catch(console.error);
};

const check = (projectName: string) => {
    const toDir = path.join(process.cwd(), projectName);
    const exists = existsSync(toDir);

    if(exists) {
        console.error('project already exists!');

    } else {
        selectTemplate(projectName);
    }
}

export default () => {
    prompt({
        type: 'input',
        name: 'projectName',
        message: 'Enter the project name you want'
    }).then((obj: any) => {
        if(!obj.projectName) {
            console.error('The project name is missing!');

        } else {
            check(obj.projectName);
        }
    });
};
