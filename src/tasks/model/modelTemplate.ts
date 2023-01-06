export const cjs =
`'use strict';
const Model = require('candyjs/model/Model');
<% function listAttrs(list, sub = '') {let ret="";for(let item of list) {let arr = item.split('=');ret = ret + "'" + arr[0].trim() + sub + "', ";} return ret.substring(0, ret.length-2);} %>
module.exports = class <%= data.modelName %> extends Model {
    constructor() {
        super();

        this.attributes = {\
<%
data.attributes.forEach((item, i) => {
let arr = item.split('='); let k = arr[0].trim(); let v = arr[1] ? arr[1].trim() : ''; let t = typeof v;
%>
            '<%= k %>': <%= v %><%= (i === data.attributes.length - 1 ? '' : ',') %>\
<% }) %>\

        };
    }

    rules() {
        return null;
        /*
        return [
            {
                rule: 'candy/model/validators/RequiredValidator',
                attributes: [<%= listAttrs(data.attributes) %>],
                messages: [<%= listAttrs(data.attributes, ' is required.') %>]
            }
        ];
        */
    }
}
`;

export const ts =
`import Model from 'candyjs/model/Model';
<% function listAttrs(list, sub = '') {let ret="";for(let item of list) {let arr = item.split('=');ret = ret + "'" + arr[0].trim() + sub + "', ";} return ret.substring(0, ret.length-2);} %>
export default class <%= data.modelName %> extends Model {
    constructor() {
        super();

        this.attributes = {\
<%
data.attributes.forEach((item, i) => {
let arr = item.split('='); let k = arr[0].trim(); let v = arr[1] ? arr[1].trim() : ''; let t = typeof v;
%>
            '<%= k %>': <%= v %><%= (i === data.attributes.length - 1 ? '' : ',') %>\
<% }) %>\

        };
    }

    rules() {
        return null;
        /*
        return [
            {
                rule: 'candy/model/validators/RequiredValidator',
                attributes: [<%= listAttrs(data.attributes) %>],
                messages: [<%= listAttrs(data.attributes, ' is required.') %>]
            }
        ];
        */
    }
}
`;
