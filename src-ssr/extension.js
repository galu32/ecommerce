const { EDESTADDRREQ } = require('constants');

module.exports.extendApp = async function ({ app, ssr }) {
    console.log(Date());
    const {query, models, authcontext} = require('oo');
    const express = require('express');
    // const cookieParser = require('cookie-parser'); // remplazar por session

    await models.syncModels();

    app.use(express.json());
    // app.use(cookieParser());

    // app.use(async (req,res,next) => {
    //     //esto no esta bien, manejar el contexto con un Map() es cualquier cosa.
    //     //funciona para avanzar si no compilo en produccion si no se pierden los valores. VER!
    //     let ctx = authcontext.get(req.headers.authorization);
    //     if (!ctx) return res.send({status:false, res:'No authorized.'});
    //     next();
    // });

    const session = require('express-session');
    app.use(session({
        secret: '2C44-4D44-WppQ38S',
        resave: true,
        saveUninitialized: true,
        cookie: { secure: false }
    }));

    // app.use(async (req,res,next) => {
    //     if (!req.session.id && req.session.path === '/login') {
    //         let rand = Math.random().toString();
    //         rand = rand.substring(2,rand.length);
    //         req.session.id = rand;
    //     }else{
    //         return res.send({status:false, res: 'No authorized!'});
    //     }
    //     next();
    // });

    app.post('/stream', async (req,res) => {
        let b = req.body;
        let q ;
        if (b.type === 'update' || b.type === 'insert'){
            q = new query();
            try{
                q = await q.update(b);
                res.send(q);
            }
            catch(err){
                console.log(err);
                res.send({status:false, err:err});
            }
        }else{
            q = new query(b._raw);
            try {
                q = await q.fetch();
                res.send(q);
            }catch (err){
                res.send({status:false, err:err});
            }
        }
    });

    app.post('/logout', async (req,res) => {
        req.session.destroy();
        res.send({status:true, res: 'ok!'});
    });

    app.post('/login', async (req,res) => {
        if (typeof req.session.userobj !== 'undefined'){
            res.send({status:true, user:req.session.userobj});
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

        // let rand = Math.random().toString();
        // rand = rand.substring(2,rand.length);
        // res.cookie('login',rand, { maxAge: 1500000, httpOnly: true });
        // authcontext.set(rand,q[0]);
        req.session.user = q[0].Username;
        req.session.admin = q[0].Admin;
        req.session.email = q[0].Email;
        req.session.userobj = q[0];

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
    let api;
    try {
        api = fs.readdirSync('src-ssr/api/');
    }catch{
        api = fs.readdirSync('/home/fran/Escritorio/quasarp/src-ssr/api/');
    }
    for (let a of api) {
        a = require('./api/'+a);
        a.init(app);
    }
};
