module.exports.extendApp = async function ({ app, ssr }) {
    console.log(Date());
    const {query, models, authcontext} = require('oo');
    const express = require('express');
    const cookieParser = require('cookie-parser'); // remplazar por session

    await models.syncModels();

    app.use(express.json());
    app.use(cookieParser());

    app.use(async (req,res,next) => {
        //esto no esta bien, manejar el contexto con un Map() es cualquier cosa.
        //funciona para avanzar si no compilo en produccion si no se pierden los valores. VER!
        let ctx = authcontext.get(req.headers.authorization);
        if (!ctx) return res.send({status:false, res:'No authorized.'});
        next();
    });

    app.post('/stream', async (req,res) => {
        let raw = req.body._raw;
        let q = new query(raw);
        try {
            q = await q.fetch();
            res.send(q);
        }catch (err){
            res.send({status:false, err:err});
        }
    });

    app.post('/logout', async (req,res) => {
        authcontext.delete(req.cookies.login);
        res.send({status:true, res: 'ok!'});
    });

    app.post('/login', async (req,res) => {
        if (typeof req.cookies.login !== 'undefined'){
            let u = authcontext.get(req.cookies.login);
            if (u) return res.send({status:true, user:u});
        }
        if (!Object.keys(req.body).length) return {status: false};
        let raw = 'SELECT * FROM User WHERE ';
        let ups = [];
        for (let f in req.body){
            if (!req.body[f]) return {status:false};
            let u = `${f} = '${req.body[f]}' `;
            ups.push(u);
        }
        raw += ups.join(' AND ');
        let q = new query(raw);
        q = await q.fetch();
        if (!q.length == 1) return res.send({status:false});

        let rand = Math.random().toString();
        rand = rand.substring(2,rand.length);
        res.cookie('login',rand, { maxAge: 1500000, httpOnly: true });
        authcontext.set(rand,q[0]);

        res.send({status:true, user:q[0]});
    });

    app.post('/register', async (req,res) => {
        let cls = models.getModel('User');
        cls = new cls();
        cls.Admin = 0;
        for (let f in req.body){
            cls[f] = req.body[f];
        }
        let s = await cls.save();
        res.send(s);
    });

    app.post('/updateContext', async (req,res) => {
        let {internalId} = req.body;
        let raw = "SELECT * FROM User WHERE internalId = " + internalId;
        let q = new query(raw);
        q = await q.fetch();
        authcontext.set(req.cookies.login, q[0]);
        res.send({status:true});
    });

    let fs = require('fs');

    let api = fs.readdirSync('src-ssr/api/');
    for (let a of api) {
        a = require('./api/'+a);
        a.init(app);
    }
};
