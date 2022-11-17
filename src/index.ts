const { Select } = require('enquirer');
import { init } from './tasks/index';

const showList = () => {
    const prompt = new Select({
        name: 'select',
        message: 'What would you want?',
        choices: [
            '1. Initialize a project',
            '2. Add a page'
        ]
    });

    prompt.run()
        .then((answer: string) => {
            switch(answer) {
                case '1. Initialize a project':
                    init();
                    break;
                case '2. Add a page':
                    console.log('This function is Not implement currentily');
                    break;
                default:
                    break;
            }
        })
        .catch(console.error);
}

showList();
