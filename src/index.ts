const { Select } = require('enquirer');
import initProject  from './tasks/init/index';
import initPage from './tasks/page/index';
import { select } from './utils/msg';

const showList = () => {
    select({
        title: 'What would you want to do?',
        list: [
            '1. Initialize a project',
            '2. Add new page',
            '3. Add new model'
        ],
        callback: (answer: string) => {
            switch(answer) {
                case '1. Initialize a project':
                    initProject();
                    break;
                case '2. Add new page':
                    initPage();
                    break;
                case '3. Add new model':
                    console.log('This function is Not implement currentily');
                    break;
                default:
                    break;
            }
        }
    });
}

showList();
