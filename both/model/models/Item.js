let Parent = require('./Model');

class Item extends Parent {

    constructor() {
        super();
    }

    async init() {
        await super.init();
    }

    getFields(){
        return {
            Code: {type: 'string', required: true},
            Name: {type: 'string', required: true},
            Image: {type: 'string', required: true},
            HomePage: {type: 'boolean', required: true},
            Categories: {type: 'set', required: true, linkto: 'Categories'},
            SubCategories: {type: 'set', required: false, linkto: 'SubCategories'},
            Description: {type: 'textarea', required: false},
            Price: {type: 'value', required: true}
        };
    }

    getUniqueFields(){
        return [
            'Code'
        ];
    }
}

module.exports = Item;