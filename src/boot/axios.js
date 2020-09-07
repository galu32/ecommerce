
const query = require('/home/fran/Escritorio/quasarp/both/Query.js');

export default async ({ app, router, store, Vue }) => {
    let modelmanager = require('/home/fran/Escritorio/quasarp/both/model/');
    try{
        window;
        let axios = require('axios');
        let models = {};
        for (let m of store.state.allmodels){
            let model = modelmanager.getModel(m);
            models[m.replace('.js', '')] = model;
            model = new model();
            model.registerFieldsComponents(Vue);
        }
        let editableC = require('../components/EditableComponents');
        editableC.init(Vue, store);
        Vue.prototype.$axios = axios;
        Vue.prototype.$query = new query();
        Vue.prototype.$models = models;
        Vue.prototype.$bus = new Vue;
        Vue.prototype.$errorResponse = (txt) => {
            Vue.prototype.$q.notify({
                message: txt,
                position: 'center',
                type: 'negative',
            });
            return false;
        };
    }catch (err) {
        let raw = "SELECT * FROM Item";
        let items = new query(raw);
        items = await items.fetch();
        raw = "SELECT * FROM Home";
        let home = new query(raw);
        home = await home.fetch();
        raw = "SELECT * FROM Categories";
        let categories = new query(raw);
        categories = await categories.fetch();
        raw = "SELECT * FROM SubCategories";
        let subcategories = new query(raw);
        subcategories = await subcategories.fetch();
        raw = "SELECT * FROM EditableComponents";
        let editableComponents = new query(raw);
        editableComponents = await editableComponents.fetch();
        raw = "SELECT * FROM Coupon";
        let coupons = new query(raw);
        coupons = await coupons.fetch();
        raw = "SELECT * FROM PayMethod";
        let paymethods = new query(raw);
        paymethods = await paymethods.fetch();
        let allmodels = modelmanager.getAllModels();
        store.replaceState({items,coupons,paymethods,categories,subcategories,editableComponents,home,allmodels});
    }

};