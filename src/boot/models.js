/*add models (mysql) to Vue Context */
export default async ({store, Vue }) => {
    let modelmanager = require('oo').models;
    let models = {};
    for (let m of store.state.allmodels){ //here models name are init by store.js boot from server querys.
        let model = modelmanager.getModel(m);
        models[m.replace('.js', '')] = model;
        model = new model();
        model.registerFieldsComponents(Vue); //register fields type Component from models
        Vue.prototype.$models = models;

    }
};