const { Select } = require('enquirer');
const download = require('download-git-repo');
import { start, stop } from '../../utils/loading';

const config: any = {
    'basic-typescript': 'direct:https://github.com/candyframework/basic-demo-ts/archive/refs/heads/main.zip',
    'basic-commonjs': 'direct:https://github.com/candyframework/basic-demo-cjs/archive/refs/heads/main.zip'
};

const load = (projectName: string, type: string) => {
    let url = config[type];

    start()
    download(url, projectName, (err: any) => {
        stop();
        console.log(err ? err : 'done')
    });
}

export default (projectName: string) => {
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
