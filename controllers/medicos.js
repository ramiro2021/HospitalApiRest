const { response } = require('express');
const Medico = require('../models/medico');

const getMedicos = async (req, res) => {

    const medicos = await Medico.find()
        .populate('usuario', 'nombre')
        .populate('hospital', 'nombre');

    res.status(200).json({
        ok: true,
        medicos
    });



}

const actualizarMedico = (req, res) => {

    res.json({
        ok: true,
        msg: 'actualizar Medico funcionando'
    });

}

const crearMedico = async (req, res) => {
    const uid = req.uid;
    const medico = new Medico({
        usuario: uid,
        ...req.body
    });


    try {

        const medicoDB = await medico.save();

        res.status(200).json({
            ok: true,
            medico: medicoDB
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }


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