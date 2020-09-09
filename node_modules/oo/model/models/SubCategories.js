let Parent = require('./Model');

class SubCategories extends Parent {

    constructor() {
        super();
    }

    async init() {
        await super.init();
    }


    getFields(){
        return {
            Code: {type: 'string'},
            Parent: {type: 'string'},
            Name: {type: 'string'},
            Description: {type: 'string'},
            Icon: {type: 'string'},
        };
    }

    getUniqueFields(){
        return [
            'Code'
        ];
    }

}

module.exports = SubCategories;