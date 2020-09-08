// variable de entorno
require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config');

// Crear sv express
const app = express();

//Cfg Cors
app.use(cors());


//BD
dbConnection();


// rutas
app.get('/', (req, res) => {
    res.status(200).json({
        status: 'success',
        msg: 'works'
    })
});



app.listen(process.env.PORT, () => {
    console.log('servidor corriendo en puerto ' + process.env.PORT);
})