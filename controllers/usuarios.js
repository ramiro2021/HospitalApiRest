const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');


const getUsuarios = async (req, res) => {

    const usuarios = await Usuario.find({}, 'nombre email role google');

    res.status(200).json({
        ok: true,
        usuarios

    })
}

const crearUsuario = async (req, res) => {

    const { email, password, nombre } = req.body;




    try {
        // verificar que el mail no ese en uso
        const existeEmail = await Usuario.findOne({ email });

        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'el correo ya esta en uso'
            });
        }

        // si no esta en uso, crear usuario
        const usuario = new Usuario(req.body);
        // encriptar password
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        // Guardar nuevo usuario validado y encriptado
        await usuario.save();

        res.status(200).json({
            ok: true,
            usuario

        });

    } catch (error) {
        // mostrar error
        console.log(error);
        res.status(500).json({
            of: false,
            msg: 'Error inesperado'
        })
    }

}



module.exports = {
    getUsuarios,
    crearUsuario
}