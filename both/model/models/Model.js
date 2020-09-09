const moment = require('moment');
const Query = require('../../Query');
class Model {

    constructor(){
        this.fields = {
            CreationTime: {type: 'time', readonly: true, internal: true},
            CreationDate: {type: 'date', readonly: true, internal: true},
            CreationUser: {type: 'string', readonly: true, internal: true}
        };
        this.unique = [];
        this.__singleton = false;
        this.init();
    }

    async init(){
        this.fields = {...this.fields, ...this.getFields()};
        for (let f in this.fields) this[f] = undefined;
        this.unique = [...this.unique, ...this.getUniqueFields()];
    }

    registerFieldsComponents(Vue){
        for (let field in this.fields){
            if (this.fields[field].type === 'component')
                this.registerComponent(Vue,field);
        }
    }

    registerComponent(Vue,field){
    }

    getFields(){
        return {};
    }

    getUniqueFields(){
        return [];
    }

    getFieldsName() {
        return Object.keys(this.fields);
    }

    loadFromRow (desc) {
        for (let f in desc) this[f] = desc[f];
    }

    name () {
        return this.constructor.name;
    }

    fieldStringTypes () {
        return ['string', 'date', 'time', 'set', 'textareas', 'component'];
    }

    async save(){
        let stringtypes = this.fieldStringTypes();
        let u;
        if (this.__singleton){
            let q = new Query ();
            q._raw = 'SELECT * FROM ' + this.name();
            q = await q.fetch();
            if (q.length) this.internalId = 1;
        }
        if (this.internalId){
            u = `UPDATE ${this.name()} SET `;
            let sets = [];
            for (let f in this.fields){
                if (this.fields[f].internal) continue;
                let ff = this[f];
                if (stringtypes.includes(this.fields[f].type))
                    if (typeof ff !== 'undefined') ff = `"${ff.toString()}"`;
                    else ff = 'NULL';
                if (this.fields[f].type === 'boolean')
                    if(!ff) ff = 0;
                    else ff = 1;
                sets.push(`${f} = ${ff} `);
            }
            u += sets.join(',');
            u += ` WHERE internalId = ${this.internalId}`;
        }else{
            let fields = this.getFieldsName();
            u = `INSERT INTO ${this.name()} `;
            u += ` (${fields.toString()}) `;
            u += `VALUES `;
            this.CreationDate = moment().format('YYYY-MM-DD');
            let sets = [];
            for (let f of fields){
                let ff = this[f];
                if (stringtypes.includes(this.fields[f].type))
                    if (typeof ff !== 'undefined') ff = `"${ff.toString()}"`;
                    else ff = 'NULL';
                if (this.fields[f].type === 'boolean')
                    if(ff === false) ff = 0;
                    else ff = 1;
                sets.push(ff);
            }
            u += ` (${sets.toString()}) `;
        }
        try {
            let q = new Query();
            q._raw = u;
            q = await q.fetch();
            if (typeof q.status !== 'undefined' && !q.status) return q;
            return {status:true, res:q};
        }catch (err){
            return {status:false, res:err};
        }
        
    }

    // async save (data) {
    //     let id = data.data.find(r => r.field === r.internalId);
    //     if (!id || !id.value) return await this.insert(data)
    //     let up = 'UPDATE ' + data.model + ' SET'
    //     let p = [];
    //     for (let i of data.data){
    //         p.push(i.field + '="' + i.value + '"' )
    //     }
    //     up += p.join(',');
    //     up += ' WHERE internalId=' + id.value;
    //     return up;
    // }

    // async insert (data) {
    //     let ins = 'INSERT INTO ' + data.model;
    //     let defs = {CreationDate: moment().format('YYYY-MM-DD')}
    //     defs.CreationUser = data.user
    //     for (let i of data.data){
    //         defs[i.field] = i.value
    //     }
    //     ins += ' (' + Object.keys(defs).toString() + ')'
    //     ins += ' VALUES (' + Object.keys(defs).map(r => "'"+defs[r]+"'").toString()+')'
    //     return ins;
    // }

}

module.exports = Model;