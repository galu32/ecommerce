module.exports.init = async (app) => {
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
};