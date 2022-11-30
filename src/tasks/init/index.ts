const path = require('node:path');
const { existsSync } = require('node:fs');
const download = require('download-git-repo');
import { start, stop } from '../../utils/loading';
import { log, select, input } from '../../utils/msg';

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
    select({
        title: 'Pick a project template',
        list: [
            'basic-typescript',
            'basic-commonjs'
        ],
        callback: (answer: string) => {
            load(projectName, answer);
        }
    });
};

const check = (projectName: string) => {
    const toDir = path.join(process.cwd(), projectName);
    const exists = existsSync(toDir);

    if(exists) {
        log('project already exists!', 'red');

    } else {
        selectTemplate(projectName);
    }
}

export default () => {
    input({
        title: 'Enter the project name you want',
        name: 'projectName',
        callback: (obj: any) => {
            if(!obj.projectName) {
                log('The project name is missing!', 'red');

            } else {
                check(obj.projectName);
            }
        }
    });
};
