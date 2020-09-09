let Parent = require('./Model');

class Coupon extends Parent {

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
            Value: {type: 'value'}
        };
    }

    getUniqueFields(){
        return [
            'Code'
        ];
    }

}

module.exports = Coupon;