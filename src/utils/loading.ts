import logUpdate from 'log-update';
const cliSpinners = require('cli-spinners');

let timer: any = 0

export const start = (type = 'dots') => {
    const spinner = cliSpinners[type]
    let i = 0

    timer = setInterval(() => {
        const { frames } = spinner
        logUpdate(frames[i = ++i % frames.length] + ' Loading')
    }, spinner.interval)
}

export const stop = () => {
    clearInterval(timer)
}
