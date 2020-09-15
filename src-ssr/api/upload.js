module.exports.init = async (app) => {
    
    const formidable = require('formidable');
    
    app.post('/upload', async (req,res) => {
        const form = new formidable.IncomingForm();
        let filenames = [];
        form.uploadDir = './public';
        form.keepExtensions = true;
        form.parse(req, (_, fields, files) => {
            let f = files[Object.keys(files)[0]]._writeStream.path;
            f = f.replace('public/', '');
            res.send(f);
        });
    });
};