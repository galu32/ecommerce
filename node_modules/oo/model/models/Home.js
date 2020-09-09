let Parent = require('./Model');

class Home extends Parent {

    constructor() {
        super();
    }

    async init() {
        await super.init();
    }


    getFields(){
        this.__singleton = true;
        return {
            Title: {type: 'string'},
            HeaderImage: {type: 'string'},
            ShowFooter: {type: 'boolean'},
        };
    }

}

module.exports = Home;