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
            Username: {type: 'string', required: true},
            Name: {type: 'string', required: true},
            Password: {type: 'string', required: true},
            Admin: {type: 'boolean'},
            Email: {type: 'string', required: true},
            ID: {type: 'string', required: true},
            Address: {type: 'string', required: true},
            ZipCode: {type: 'integer', required: true},
            Locality: {type: 'string', required: true},
            City: {type: 'string', required: true},
            Country: {type: 'string', required: true},
        };
    }

    getUniqueFields(){
        return ['Username', 'Email'];
    }

    static getCheckoutShipFields() {
        return {
            Email: {type: 'string', required: true},
            Name: {type: 'string', required: true},
            ID: {type: 'string', required: true},
            Address: {type: 'string', required: true},
            ZipCode: {type: 'integer', required: true},
            Locality: {type: 'string', required: true},
            City: {type: 'string', required: true},
            Country: {type: 'string', required: true},
            PayMethods: {type: 'set', required: true, linkto: 'paymethods'},
            ShipMethods: {type: 'set', required: true, linkto: 'shipmethods'}
        };
    }

}

module.exports = User;