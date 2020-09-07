module.exports.extendApp = async function ({ app, ssr }) {
    const context = new Map(); //provisorio
    const query = require('../both/Query');
    const models = require('../both/model');
    const express = require('express');
    const cookieParser = require('cookie-parser');

    await models.syncModels();

    app.use(express.json());
    app.use(cookieParser());

    app.post('/stream', async (req,res) => {
        // if (typeof req.cookies.login === 'undefined') res.send({status:false, error: 'Not Loged'});
        let raw = req.body._raw;
        let q = new query(raw);
        try {
            q = await q.fetch();
            res.send(q);
        }catch (err){
            res.send({status:false, err:err});
        }
    });

    app.post('/fetch_resources', async (req,res) => {
        let raw = "SELECT * FROM Item";
        let items = new query(raw);
        items = await items.fetch();
        raw = "SELECT * FROM Home";
        let home = new query(raw);
        home = await home.fetch();
        let allmods = models.getAllModels();
        res.send(JSON.stringify({home, items, allmodels: allmods}));
    });

    app.post('/login', async (req,res) => {
        let {user,pass} = req.body;
        if (typeof req.cookies.login !== 'undefined'){
            let u = context.get(req.cookies.login);
            if (u) return res.send({status:true, user:u});
        }
        if (!user || !pass) return res.send({status:false});
        let raw = `SELECT * FROM User WHERE Username = '${user}' AND Password = '${pass}' `;
        let q = new query(raw);
        q = await q.fetch();
        if (!q.length == 1) return res.send({status:false});

        let rand = Math.random().toString();
        rand = rand.substring(2,rand.length);
        res.cookie('login',rand, { maxAge: 900000, httpOnly: true });
        context.set(rand,q[0]);

        res.send({status:true, user:q[0]});
    });

    // app.post('/save', async (req,res) => {
    //     let user = context.get(req.cookies.login);
    //     if (!user) return res.send({status:false});
    //     user = user.Username;
    //     let data = {...req.body, ...{user: user}};
    //     let model = new models.getModel(data.model);
    //     let save = await model.save(data);
    //     if (!save) return res.send({status:false});
    //     console.log(save);
    //     let q = new query(connection,save);
    //     try{
    //         save = await q.fetch();
    //         res.send({status:true, res:save});
    //     }catch(err){
    //         res.send({status:false,res:err});
    //     }
    // });

};
