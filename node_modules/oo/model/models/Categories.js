let Parent = require('./Model');

class Categories extends Parent {

    constructor() {
        super();
    }

    async init() {
        await super.init();
    }


    getFields(){
        return {
            Code: {type: 'string'},
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

module.exports = Categories;