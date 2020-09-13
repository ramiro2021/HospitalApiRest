const { response } = require('express');
const Hospital = require('../models/hospital');

const getHospitales = (req, res) => {

    res.status(200).json({
        ok: true,
        msg: 'getHospitales'
    });

}

const actualizarHospital = async (req, res) => {

    res.status(200).json({
        ok: true,
        msg: 'actualizar Hospital funcionando'
    });
}

const crearHospital = async (req, res) => {
    const uid = req.uid;
    const hospital = new Hospital({
        usuario: uid,
        ...req.body
    });


    try {


        const hospitalDB = await hospital.save();

        res.status(200).json({
            ok: true,
            hospital: hospitalDB
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: true,
            msg: 'Hable con el administrador'
        });
    }

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