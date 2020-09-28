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

const actualizarMedico = async (req, res) => {
    // id medico
    const id = req.params.id;
    // usuario id del JWToken
    const uid = req.uid
    try {
        const medico = await Medico.findById(id);

        if (!medico) {
            return res.status(404).json({
                ok: true,
                msg: 'No existe un medico con ese id',
                id
            });
        }

        const cambiosMedico = {
            ...req.body,
            usuario: uid
        }

        const medicoActualizado = await Medico.findByIdAndUpdate(id, cambiosMedico, { new: true });

        res.status(200).json({
            ok: true,
            msg: 'actualizar Medico funcionando',
            medico: medicoActualizado
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Ocurrio un error al actualizar'
        });
    }

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

const borrarMedico = async (req, res) => {

    // id medico
    const id = req.params.id;
    // usuario id del JWToken
    const uid = req.uid
    try {
        const medico = await Medico.findById(id);

        if (!medico) {
            return res.status(404).json({
                ok: true,
                msg: 'No existe un medico con ese id',
                id
            });
        }

        await Medico.findByIdAndDelete(id);

        res.status(200).json({
            ok: true,
            msg: 'Medico eliminado',
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Ocurrio un error al eliminar'
        });
    }
}


module.exports = {
    getMedicos,
    actualizarMedico,
    crearMedico,
    borrarMedico
}