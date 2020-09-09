module.exports.extendApp = async function ({ app, ssr }) {
    const context = new Map(); //provisorio
    const {query} = require('oo');
    const {models} = require('oo');
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

    app.post('/login', async (req,res) => {
        if (typeof req.cookies.login !== 'undefined'){
            let u = context.get(req.cookies.login);
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
        context.set(rand,q[0]);

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
        context.set(req.cookies.login, q[0]);
        res.send({status:true});
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

    const mercadopago = require ('mercadopago');

    mercadopago.configure({
        access_token: 'TEST-2973480930142802-090723-52893738940ff669a2c0210564790005-383264688'
    });

    app.post('/genOrder', async (req,res) => {
        mercadopago.preferences.create(req.body)
            .then(function(response){
                // Este valor reemplazará el string "<%= global.id %>" en tu HTML
                global.id = response.body.id;
                return res.send({status:true, res: response.body});
            }).catch(function(error){
                console.log(error);
                if (error) return res.send({status:false, res: error});
            });
    });

    let transporter;
    let genTransporter = async (settings) => {
        let mailing = require('nodemailer');
        transporter = mailing.createTransport({
            host: settings.Host,
            port: settings.Port,
            secure: settings.Secure, // true for 465, false for other ports
            auth: {
                user: settings.User, // generated ethereal user
                pass: settings.Pass, // generated ethereal password
            },
        });
    };

    let mailettings = models.getModel('MailSettings');
    mailettings = new mailettings();
    let ms = await mailettings.bringAll();
    if (ms && ms.length) genTransporter(ms[0]);
    
    app.post('/send_mail', async (req,res) => {
        if (!transporter) {
            let ms = await mailettings.bringAll();
            if (ms && ms.length) genTransporter(res[0]);
            else return res.send({status:false, res: 'No mail settings'});
        }
        try{
            let {to,subject,text,html} = req.body;
            let mail = await transporter.sendMail({
                from: ms.MailFrom
                ,to,subject,text,html
            });
            res.send({status:true,res:mail.messageId});
        }catch(e){
            res.send({status:false,res:e});
        }
    });


};
