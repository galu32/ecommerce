//will load global resources from mysql to vuex $store need to be optimized
export default async ({ store, Vue }) => {

    //register editable components after init server resources / store
    if (typeof window !== 'undefined') {

        console.log(store.state.comps);
        for (let c of store.state.comps){
            let cc = require('components/EditableComponents/'+c);
            cc.init(Vue,store);
        }
    
    } else {//load on server only
        let {models} = require('oo');
        let {query} = require('oo');
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
        raw = "SELECT * FROM ShipMethod";
        let shipmethods = new query(raw);
        shipmethods = await shipmethods.fetch();
        let allmodels = models.getAllModels();

        //register editable components after init store some templates can be stored on "editableComponents"

        let fs = require('fs');
        let path = "src/components/EditableComponents/";
        let comps = fs.readdirSync(path);
        let fields = fs.readdirSync(path+'Fields');
        comps = [...comps.filter(r => r.endsWith('.js')), ...fields.map(r => 'Fields/'+r)];

        store.replaceState({items,coupons,shipmethods,paymethods,categories,subcategories,editableComponents,home,allmodels,comps});

        console.log(comps);
        for (let c of comps){
            let cc = require('src/components/EditableComponents/'+c);
            cc.init(Vue,store);
        }

    }
};