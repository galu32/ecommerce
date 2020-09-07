const Query = require('../Query');

let models = {};

let getAllModels = () => {
    let fs = require('fs');
    try{
        return fs.readdirSync('/home/fran/Escritorio/quasarp/both/model/models');
    }catch{
        return fs.readdirSync('../../both/model/models');
    }

};
models.getAllModels = getAllModels;

// if (!models['Model']){
//     for (let m of getAllModels()){
//         models[m.replace('.js', '')] = require('./models/' + m)
//     }
// }

models.getModel = (model) => {
    return require('./models/' + model);
};

let fieldsDict = {
    'string' : 'varchar(255)',
    'set' : 'varchar(255)',
    'boolean' : 'tinyint(1)',
    'integer' : 'INT',
    'date' : 'date',
    'time' : 'time',
    'textarea' : 'text',
    'value' : 'double',
    'component' : 'text'
};

models.fieldsDict = fieldsDict;

models.syncModels = async () => {
    let models = getAllModels();
    for (let model of models) {
        if (model.includes('Model')) continue; //BASEMODEL
        let cls = require('./models/' + model);
        model = model.replace('.js', '');
        let desc = 'DESCRIBE ' + model;
        let query = new Query(desc);
        try{
            desc = await query.fetch();
            if (desc && desc.code === 'ER_NO_SUCH_TABLE') throw new Error(desc);
        }catch(err){
            console.log(err,1);
            if (err.toString().includes('ER_NO_SUCH_TABLE')){
                query._raw = 'CREATE TABLE ' + model + ' (internalId int NOT NULL AUTO_INCREMENT, PRIMARY KEY (internalId));';
                try {
                    await query.fetch();
                    desc = [];
                }catch (err) {
                    // console.log(err)
                    console.log('error in sync table ' + model + ' aborting');
                    continue;
                }
            }
        }
        let newcls = new cls();
        fields = newcls.fields;
        let unique = newcls.unique;
        let alter = 'ALTER TABLE ' + model + ' \n';
        let alt = [];
        let tablefields = desc.map(r => r.Field);
        for (let f in fields){
            if (tablefields.includes(f)) continue;
            let a = 'ADD ' + f + ' ' + fieldsDict[fields[f].type] + ' DEFAULT NULL ';
            if (unique.includes(f)) a += ' UNIQUE ';
            alt.push(a);
        }
        if (!alt.length) continue;
        alter += alt.join(',');
        console.log('adding fields');
        try {
            query._raw = alter;
            let res = await query.fetch();
            if (res && res.errno) throw new Error(res);
        } catch (err) {
            console.log(err);
            console.log('error adding fields model ' + model + 'aborting');
            continue;
        }
    }
};

models.toJSON = () => {
    let res = {};
    for (let m of getAllModels()){
        let cls = require('./models/' + m);
        cls = new cls();
        res[m.replace('.js', '')] = JSON.stringify(cls);
    }
    return res;
};

module.exports = models;