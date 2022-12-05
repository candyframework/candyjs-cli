export const ts =
`import Controller from 'candyjs/web/Controller';

export default class IndexController extends Controller {

    run() {
        this.getView().title = 'new page';
        this.getView().enableLayout = true;

        this.render('index', {
            content: 'new page'
        });
    }

}
`;

export const cjs =
`'use strict';

const Controller = require('candyjs/web/Controller');

class IndexController extends Controller {

    run() {
        this.getView().title = 'new page';
        this.getView().enableLayout = true;

        this.render('index', {
            content: 'new page'
        });
    }

}

module.exports = IndexController;
`;
