const { Select, Confirm, prompt } = require('enquirer');

const styles: any = {
    'black'   : ['\x1B[30m', '\x1B[39m'],
    'blue'    : ['\x1B[34m', '\x1B[39m'],
    'cyan'    : ['\x1B[36m', '\x1B[39m'],
    'green'   : ['\x1B[32m', '\x1B[39m'],
    'red'     : ['\x1B[31m', '\x1B[39m'],
    'yellow'  : ['\x1B[33m', '\x1B[39m']
};

export const log = (msg: string, color: string = 'black') => {
    console.log(styles[color][0] + '%s' + styles[color][1], msg)
};

export const confirm = (configs: {title: string, callback: any}) => {
    const prompt = new Confirm({
        name: 'confirm',
        message: configs.title
    })

    prompt.run()
        .then((answer: boolean) => {
        configs.callback(answer)
        })
        .catch(console.error);
};

export const input = (configs: {title: string, name: string, callback: any}) => {
    prompt({
        type: 'input',
        name: configs.name,
        message: configs.title
    }).then((obj: any) => {
        configs.callback(obj)
    });
};

export const select = (configs: {title: string, list: string[], callback: any}) => {
    const prompt = new Select({
        name: 'select',
        message: configs.title,
        choices: configs.list
    })
    prompt.run()
        .then((answer: string) => {
        configs.callback(answer)
        })
        .catch(console.error);
};
