module.exports.init = async (app) => {
    let {models} = require('oo');
    let mailing = require('nodemailer');
    let transporter;
    let genTransporter = async (settings) => {
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