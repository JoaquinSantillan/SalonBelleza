//conexion base de datos 
const sql = require('mssql');

const dbSettings = 
{
    authentication:{
        type:'default',
        options:
        {
            userName:'userJoaquin',
            password:'joaquincabinero'
        },
    },
    server:"DESKTOP-9EVM3LF",
    database:'Prueb',
    options:
    {
        encrypt:true,
        trustServerCertificate: true,
    }
};

const getConnection = async()=>
    {
        try {
            const pool = await sql.connect(dbSettings);
            return pool
        } catch (e) {
            console.log("ocurrior un error "+e)
        }
    }

module.exports.getConnection = getConnection;