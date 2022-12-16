/**
 * 简单 js 模板引擎
 *
 * @author afu
 *
 * eg.
 *
 * var html =
 * `
 * <div class="demo">
 *     <ul>
 *     <% for(var i=0; i<data.length; i++){ %>
 *     <li><%= data[i] %></li>
 *     <% } %>
 *     </ul>
 * </div>
 * `;
 *
 * var x = new XTemplate();
 * x.compile(html);
 *
 * var ret = x.run([1, 2, 3, 4, 5]);
 * console.log(ret);
 *
 */
export default class T {
    compiled = ['var tpl = "";'];
    jsRegex = /<%([\s\S]*?)%>/g;

    onText(text: string) {
        let t = 'tpl += "' + text + '";';

        this.compiled.push(t);
    }

    onJs(text: string) {
        this.compiled.push(text);
    }

    onJsPlaceholder(text: string) {
        let t = 'tpl += ' + text + ';';

        this.compiled.push(t);
    }

    onEnd() {
        this.compiled.push('return tpl;');
    }

    processText(text: string) {
        return text.replace(/\r\n|\n/g, '\\n').replace(/"/g, '\\"');
    }

    compile(html: string) {
        let parts = null;
        // the index at which to start the match
        let lastIndex = 0;

        while( null !== (parts = this.jsRegex.exec(html)) ) {
            // text
            if(parts.index > lastIndex) {
                let text = html.substring( lastIndex, parts.index );
                text = this.processText(text);

                this.onText(text);
            }
            lastIndex = this.jsRegex.lastIndex;

            let js = parts[1];
            if('=' === js.charAt(0)) {
                this.onJsPlaceholder(js.substring(1));

            } else {
                this.onJs(js);
            }
        }

        // 最后剩余 text
        this.onText( this.processText(html.substring(lastIndex)) );
        this.onEnd();

        return this.compiled;
    }

    run(data: any) {
        return new Function('data', this.compiled.join('\n'))(data);
    }
}
