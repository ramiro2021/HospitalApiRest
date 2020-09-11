const { response } = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const login = async (req, res = response) => {

    const { email, password } = req.body;

    try {


        // verificar email
        const usuarioDB = await Usuario.findOne({ email });

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Las credenciales no son correctas'
            });
        }

        // verificar contraseñá
        const validPassword = bcrypt.compareSync(password, usuarioDB.password);

        if (!validPassword) {
            return res.status(404).json({
                ok: false,
                msg: 'Las credenciales no son correctas'
            });
        }

        // Generar el token - JWT
        const token = await generarJWT(usuarioDB.id);

        res.status(200).json({
            ok: false,
            msg: 'Login funcionando',
            token
        });


    } catch (error) {
        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Ocurrio un error en el login'
        });
    }
}

module.exports = {
    login
}