const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const {getConnection} = require('./services/databaseServices');

const app = express();
const PORT = 3000;
getConnection();


app.use(bodyParser.urlencoded({extends:false}));
app.use(bodyParser.json());

const turns = require('./routes/Turns');

app.use('/api/',turns);

app.listen(PORT,()=>
    {
        console.log('escuchando en el puerto'+PORT);
    });