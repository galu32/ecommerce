import axios from 'axios';
import query from '../../both/Query';

export default async ({ app, router, store, Vue }) => {
    let modelmanager = require('../../both/model/');
    try{
        window;
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
        let allmodels = modelmanager.getAllModels();
        console.log(store.state);
        store.replaceState({items,categories,subcategories,editableComponents,home,allmodels});
        // let model = require('../../both/model');
    }

};