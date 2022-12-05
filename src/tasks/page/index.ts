const path = require('node:path');
const process = require('node:process');
const { existsSync, writeFile, readdir, statSync } = require('node:fs');
import { confirm, input, select, log } from '../../utils/msg';
import { createDirectory } from '../../utils/file';

import { ts, cjs } from './controllerTemplate';
import { view } from './viewTemplate';

const createPage = (controllerPath: string, viewPath: string) => {
     // template
     select({
        title: 'Typescript or CommonJs?',
        list: [
            'Typescript',
            'CommonJs'
        ],
        callback: (rs: string) => {
            let controllerContent = 'Typescript' === rs ? ts : cjs;
            let viewContent = view;

            createDirectory(controllerPath, () => {
                writeFile(controllerPath + '/IndexController.ts', controllerContent, (err: any) => {
                    if(err) {
                        console.error(err);

                    } else {
                        console.log('Add page of controller success');
                    }
                });
            });

            createDirectory(viewPath, () => {
                writeFile(viewPath + '/index.html', viewContent, (err: any) => {
                    if(err) {
                        console.error(err);

                    } else {
                        console.log('Add page of view success');
                    }
                });
            });
        }
    });
}

const addPageToProject = (projectRootDir: string) => {
    let controllerPath = projectRootDir + '/app/controllers';
    let viewPath = projectRootDir + '/app/views';

    input({
        name: 'pagename',
        title: 'What is the page name do you want?',
        callback: (obj: any) => {
            if(!obj.pagename) {
                log('The page name is missing!', 'red');

            } else {
                let name = obj.pagename.toLowerCase();
                controllerPath = controllerPath + '/' + name;
                viewPath = viewPath + '/' + name;

                if(existsSync(controllerPath)) {
                    log('The page already exists!', 'red');

                } else {
                    createPage(controllerPath, viewPath);
                }
            }
        }
    });
}

const confirmProject = (projectRootDir: string) => {
    const name = path.basename(projectRootDir);

    confirm({
        title: 'Do you want to add new page to project: ' + name,
        callback: (rs: boolean) => {
            if(rs) {
                addPageToProject(projectRootDir);
            }
        }
    });
}

const selectProject = (currentDir: string) => {
    readdir(currentDir, { withFileTypes: true }, (err: any, list: any) => {
        let ret = list.filter((item: any) => item.isDirectory());

        ret = ret.map((folder: any) => {
            const fullFolderPath = currentDir + '/' + folder.name;
            const stats = statSync(fullFolderPath);
            return { name: folder.name, path: fullFolderPath, ctimeMs: stats.ctimeMs };
        });

        ret.sort((a: any, b: any) => {
            return b.ctimeMs - a.ctimeMs;
        });


        if(ret.length <= 0) {
            log('You must init a project first!', 'red');
            return;
        }

        select({
            title: 'Which project do you want to add to?',
            list: ret.map((item: any) => item.name),
            callback: (rs: string) => {
                const dir = currentDir + '/' + rs

                addPageToProject(dir)
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
