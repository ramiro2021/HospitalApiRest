const { response } = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');

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
            ok: true,
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

const googleSignIn = async (req, res = response) => {

    const googleToken = req.body.token;

    try {
        const { name, email, picture } = await googleVerify(googleToken);
        const usuarioDB = await Usuario.findOne({ email });
        let usuario;
        if (!usuarioDB) {
            // si no existe el usuario
            usuario = new Usuario({
                nombre: name,
                email,
                password: '@@@',
                img: picture,
                google: true,
            });
        } else {
            // existe usuario
            usuario = usuarioDB;
            usuario.google = true;
        }

        await usuario.save();
        // Generar el token - JWT
        const token = await generarJWT(usuario.id);

        res.status(200).json({
            ok: true,
            msg: 'GOOGLE SIGN IN',
            token
        })
    } catch (error) {
        res.status(401).json({
            ok: false,
            msg: 'token invalido'
        })
    }


}

const renewToken = async (req, res = response) => {
    const uid = req.uid;
    // Generar el token - JWT
    const token = await generarJWT(uid);
    res.json({
        ok: true,
        token
    })
}

module.exports = {
    login,
    googleSignIn,
    renewToken
}