let Parent = require('./Model');

class UserConfig extends Parent {

    constructor() {
        super();
    }

    async init() {
        await super.init();
    }


    getFields(){
        return {
            Model: {type: 'string'},
            Columns: {type: 'string'},
        };
    }

}

module.exports = UserConfig;