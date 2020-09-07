let Parent = require('./Model');

class PayMethod extends Parent {

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
            Description: {type: 'string', required: true},
            Image: {type: 'string', required: true},
            Instantly: {type: 'boolean'},
            FreeShip: {type: 'boolean'}
        };
    }

    getUniqueFields(){
        return [
            'Code'
        ];
    }

}

module.exports = PayMethod;