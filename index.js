// variable de entorno
require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config');

// Crear sv express
const app = express();

//Cfg Cors
app.use(cors());


// Lectura y parseo de body 
app.use(express.json());

//BD
dbConnection();


// rutas
app.use('/api/usuarios', require('./routes/usuarios'));



app.listen(process.env.PORT, () => {
    console.log('servidor corriendo en puerto ' + process.env.PORT);
})