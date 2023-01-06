const path = require('node:path');
const { existsSync, writeFile } = require('node:fs');
import { confirm, input, select, log } from '../../utils/msg';
import { ucFirst } from '../../utils/string';
import T from '../../utils/T';
import { listDir, createDirectory } from '../../utils/file';
import { cjs, ts } from './modelTemplate';

const createModel = (modelPath: string, modelName: string, type: string) => {
    input({
        name: 'attrs',
        title: 'Enter the list of attributes with default value, like: name=\'\', age=0',
        callback: (obj: any) => {
            if(!obj.attrs) {
                log('The model attributes is missing!', 'red');

            } else {
                let attrs: string = obj.attrs.trim();
                let list = attrs.split(',').map((v) => {
                    return v.trim();
                });

                const x = new T();
                x.compile('Typescript' === type ? ts : cjs);
                let str = x.run({
                    attributes: list,
                    modelName: modelName.replace(/\.js|\.ts/, '')
                });

                createDirectory(modelPath, () => {
                    writeFile(modelPath + '/' + modelName, str, (err: any) => {
                        if(err) {
                            console.error(err);

                        } else {
                            console.log('Add model success');
                        }
                    });
                });
            }
        }
    });
}

const addModelToProject = (projectRootDir: string) => {
    select({
        title: 'Typescript or CommonJs?',
        list: [
            'Typescript',
            'CommonJs'
        ],
        callback: (rs: string) => {
            let modelPath = projectRootDir + '/app/models';

            input({
                name: 'modelName',
                title: 'Enter the model name you want',
                callback: (obj: any) => {
                    if(!obj.modelName) {
                        log('The model name is missing!', 'red');

                    } else {
                        let name = ucFirst(obj.modelName) + 'Model' + ( 'Typescript' === rs ? '.ts' : '.js' );
                        let file = modelPath + '/' + name;

                        if(existsSync(file)) {
                            log('The model file already exists!', 'red');

                        } else {
                            createModel(modelPath, name, rs);
                        }
                    }
                }
            });
        }
    });
}

const confirmProject = (projectRootDir: string) => {
    const name = path.basename(projectRootDir);

    confirm({
        title: 'Do you want to add new model to project: ' + name,
        callback: (rs: boolean) => {
            if(rs) {
                addModelToProject(projectRootDir);
            }
        }
    });
}

const selectProject = (currentDir: string) => {
    listDir(currentDir, (ret: string[]) => {
        if(ret.length <= 0) {
            log('You must init a project first!', 'red');
            return;
        }

        select({
            title: 'Which project do you want to add to?',
            list: ret.map((item: any) => item.name),
            callback: (rs: string) => {
                const dir = currentDir + '/' + rs

                addModelToProject(dir);
            }
        });
    });
}

export default () => {
    // 是否已经在项目目录了
    const current = process.cwd();
    const inProject = existsSync(current + '/package.json');

    if(inProject) {
        confirmProject(current);

    } else {
        selectProject(current);
    }
}
