const { response } = require('express');


const getMedicos = (req, res) => {

    res.json({
        ok: true,
        msg: 'getMedicos'
    });

}

const actualizarMedico = (req, res) => {

    res.json({
        ok: true,
        msg: 'actualizar Medico funcionando'
    });

}

const crearMedico = (req, res) => {

    res.json({
        ok: true,
        msg: 'crear Medico funcionando'
    });

}

const borrarMedico = (req, res) => {

    res.json({
        ok: true,
        msg: 'borrar Medico funcionando'
    });

}


module.exports = {
    getMedicos,
    actualizarMedico,
    crearMedico,
    borrarMedico
}