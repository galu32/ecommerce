let Parent = require('./Model');

class User extends Parent {

    constructor() {
        super();
    }

    async init() {
        await super.init();
    }

    getFields(){
        return {
            Username: {type: 'string'},
            Name: {type: 'string'},
            Password: {type: 'string'},
            Admin: {type: 'boolean'},
            Email: {type: 'string'}
        };
    }

}

module.exports = User;