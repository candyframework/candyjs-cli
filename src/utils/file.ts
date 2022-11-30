const fs = require('node:fs');

export const getDirname = (dir: string) => {
    dir = dir.replace(/\\/g, '/').replace(/\/[^\/]*\/?$/, '');

    return '' === dir ? '/' : dir;
}

export const createDirectory = (dir: string, callback: any = null, mode: number = 0o777) => {
    fs.access(dir, fs.constants.F_OK, (error: any) => {
        if(null === error) {
            null !== callback && callback(null);
            return true;
        }

        let parentDir = getDirname(dir);
        createDirectory(parentDir, (err: any) => {
            fs.mkdir(dir, mode, callback);
        }, mode);
    });
}
