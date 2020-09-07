let axios = require('axios');
let obj = {};
try {
    window;
}catch{
    const mysql = require('mysql');
    const connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'fran',
        password : 'fran',
        database : 'fusion',
    });
    obj.connection = connection;
}
const Query = class {
    constructor(raw = ''){
        if (obj.connection) this._con = obj.connection;
        this._select = "SELECT ";
        this._from = "FROM ";
        this._where = "";
        this._raw = "" || raw;
    }

    static getConnection(){
        return obj.connection;
    }

    describe(table) {
        this._raw = 'DESCRIBE ' + table;
        return this;
    }

    select (columns=[]) {
        this._select += columns.toString();
        return this;
    }

    from (from) {
        this._from += from;
        return this;
    }

    where (where = {}) {
        let w = [];
        for (let c in where)
            w.push(c + "=" + where[c]);
        if (w.length) this._where = 'WHERE ' + w.join(' AND ');
        return this;
    }

    // fetch () {
    //     this._raw = [this._select, this._from, this._where].join('\n');
    //     console.log(process.env)
    //     return this._raw;
    // }

    async fetch(){
        if (!this._select.length) return [];
        if (!this._raw) this._raw = [this._select,this._from,this._where].join('\n');
        try {
            window;
            let data = JSON.stringify(this);
            data = await axios({
                method: 'post',
                url: '/stream',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            });
            return data.data;
        }catch{
            let {promisify} = require('util');
            this._bind = promisify(this._con.query).bind(this._con);
            try{
                return await this._bind(this._raw);
            }catch(e){
                return e;
            }
        }
        finally{
            this._select = "SELECT ";
            this._from = "FROM ";
            this._where = "";
            this._raw = "";

        }
    }
};

module.exports = Query;