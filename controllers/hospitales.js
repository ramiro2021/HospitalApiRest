const { response } = require('express');
const Hospital = require('../models/hospital');

const getHospitales = async (req, res) => {
    const hospitales = await Hospital.find().populate('usuario', 'nombre');

    res.status(200).json({
        ok: true,
        hospitales
    });

}

const actualizarHospital = async (req, res) => {
    // id hospital
    const id = req.params.id;
    // usuario id del JWToken
    const uid = req.uid
    try {
        const hospital = await Hospital.findById(id);

        if (!hospital) {
            return res.status(404).json({
                ok: true,
                msg: 'No existe un hospital con ese id',
                id
            });
        }

        const cambiosHospital = {
            ...req.body,
            usuario: uid
        }

        const hospitalActualizado = await Hospital.findByIdAndUpdate(id, cambiosHospital, { new: true });

        res.status(200).json({
            ok: true,
            msg: 'actualizar Hospital funcionando',
            hospital: hospitalActualizado
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Ocurrio un error al actualizar'
        });
    }


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

const borrarHospital = async (req, res) => {

    // id hospital
    const id = req.params.id;

    try {
        const hospital = await Hospital.findById(id);

        if (!hospital) {
            return res.status(404).json({
                ok: true,
                msg: 'No existe un hospital con ese id',
                id
            });
        }

        await Hospital.findByIdAndDelete(id);


        res.status(200).json({
            ok: true,
            msg: 'Hospital eliminado',

        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Ocurrio un error al eliminar'
        });
    }



}


module.exports = {
    getHospitales,
    actualizarHospital,
    crearHospital,
    borrarHospital
}