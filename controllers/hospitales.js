const { response } = require('express');


const getHospitales = (req, res) => {

    res.json({
        ok: true,
        msg: 'getHospitales'
    });

}

const actualizarHospital = (req, res) => {

    res.json({
        ok: true,
        msg: 'actualizar Hospital funcionando'
    });

}

const crearHospital = (req, res) => {

    res.json({
        ok: true,
        msg: 'crear Hospital funcionando'
    });

}

const borrarHospital = (req, res) => {

    res.json({
        ok: true,
        msg: 'borrar Hospital funcionando'
    });

}


module.exports = {
    getHospitales,
    actualizarHospital,
    crearHospital,
    borrarHospital
}