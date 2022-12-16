export const cjs =
`'use strict';
const Model = require('candyjs/model/Model');

module.exports = class UserModel extends Model {
    constructor() {
        super();

        this.attributes = {
            <%= data.attributes %>
        };
    }

    rules() {
        return null;
        /*
        return [
            {
                rule: 'candy/model/validators/RequiredValidator',
                attributes: ['user_name', 'password', 'email'],
                messages: ['username is required', 'password is required', 'email is required']
            }
        ];
        */
    }
}
`;

export const ts =
`import Model from 'candyjs/model/Model';

export default class UserModel extends Model {
    constructor() {
        super();

        this.attributes = {
            <%= data.attributes %>
        };
    }

    rules() {
        return null;
        /*
        return [
            {
                rule: 'candy/model/validators/RequiredValidator',
                attributes: ['user_name', 'password', 'email'],
                messages: ['username is required', 'password is required', 'email is required']
            }
        ];
        */
    }
}
`;
