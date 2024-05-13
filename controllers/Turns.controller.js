const { getConnection } = require("../services/databaseServices")
const sql = require('mssql');
const hashPassword = require("../services/hashPass");
const jwt = require('jsonwebtoken');
const generateJWT = require("../services/generateJWT");


const getAllTurn = async(req,res)=>
    {  
        const pool = await getConnection()

        const turns = await pool.request().query("SELECT * FROM Turnos")

        res.status(200).json(turns.recordset)
    }


const createUser = async(req,res)=>
    {  

        const password = req.body.password;
        const passwordEncrypt = await hashPassword(password);
        const username = req.body.username;

        //const token = generateJWT(username);

        try {
            const pool = await getConnection()
    
            const createUser = await pool.request()
            .input('name',sql.VarChar,req.body.name)
            .input('lastname',sql.VarChar,req.body.lastname)
            .input('username',sql.VarChar,req.body.username)
            .input('password',sql.VarChar,passwordEncrypt)
            .input('edad',sql.Int,req.body.edad)
            .query("insert into users (name,lastname,username,password,edad) values (@name,@lastname,@username,@password,@edad)")
        
            res.status(201).json(createUser.recordset, token)
            console.log(createUser)
        } catch (error) {
            console.log(error+'error: no se pudo crear el usuario intente nuevamente')
            res.status(401).json({messageErrorUserCreate:"error: no se pudo crear el usuario intente nuevamente"})
        }
    }
    

    
const createTurn = async(req,res)=>
    {  

        const token = req.user;

        try{
        const pool = await getConnection();

        const validateTimeTurn = await pool.request().input('timeTurn',sql.VarChar,req.body.timeTurn).query("SELECT * FROM Turnos WHERE CAST(timeTurn AS TIME) = CAST(@timeTurn AS TIME) ");
        const validateTurn = await pool.request()
        .input('typeTurn',sql.VarChar,req.body.typeTurn).query('SELECT * FROM Turnos WHERE typeTurn = @typeTurn');

        if(validateTurn.recordset.length > 0 && validateTimeTurn.recordset.length > 0)
            {
                res.status(401).json({errorMessa:"Esta fecha, hora esta tomado por otra persona"})
            }

        const createTurn = await pool.request()
        .input('id',sql.Int,req.body.id)
        .input('name',sql.VarChar, req.body.name)
        .input('lastname',sql.VarChar, req.body.lastname)
        .input('numberPhone',sql.BigInt, req.body.numberPhone)
        .input('dateTurn',sql.Date, req.body.dateTurn)
        .input('typeTurn',sql.VarChar,req.body.typeTurn)
        .input('timeTurn',sql.VarChar,req.body.timeTurn)
        .query('INSERT INTO Turnos (id,name,lastname,numberPhone,dateTurn,typeTurn,timeTurn) VALUES (@id,@name,@lastname,@numberPhone,@dateTurn,@typeTurn,@timeTurn) ');
    

        res.json(createTurn.recordset);
        } catch (error) {
        console.error('Error al crear turno:', error);
        res.status(500).json({ error: 'Error al crear turno'});
        }
    }

module.exports = 
{
    createTurn,getAllTurn,createUser
}