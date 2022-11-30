const str =
`import Controller from 'candyjs/web/Controller';

export default class IndexController extends Controller {

    run() {
        this.getView().title = 'new page';
        this.getView().enableLayout = true;

        this.render('index');
    }

}
`;

export default str;
