const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');

// traer todos los usuarios
const getUsuarios = async (req, res) => {

    const usuarios = await Usuario.find({}, 'nombre email role google');

    res.status(200).json({
        ok: true,
        usuarios

    })
}

// crear un nuevo usuario
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

        // Generar el token - JWT
        const token = await generarJWT(usuario.id);

        res.status(200).json({
            ok: true,
            usuario,
            token

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

// buscar usuario y actualizarlo
const actualizarUsuario = async (req, res = response) => {

    // TODO: Validar token y comprobar si es el usuario correcto

    const uid = req.params.id;


    try {

        // buscar usuario por id 
        const usuarioDB = await Usuario.findById(uid);
        // supuesto caso de que no exista usuario
        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario con ese uid'
            });
        }
        // UPDATES
        const { password, google, email, ...campos } = req.body;

        // si el usuario quiere actualizar su email
        if (usuarioDB.email !== email) {
            // verificar que no este en uso
            const existeEmail = await Usuario.findOne({ email });
            if (existeEmail) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con ese email'
                });
            }

        }
        // asignarle el email y actualzar
        campos.email = email;
        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, { new: true });

        res.status(200).json({
            ok: true,
            usuarioActualizado
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'error inesperado'
        });
    }
}
// buscar usuario y borrarlo fisicamente
const borrarUsuario = async (req, res = response) => {

    const uid = req.params.id;

    try {

        const usuarioDB = await Usuario.findById(uid);

        if (!usuarioDB) {
            res.status(404).json({
                ok: false,
                msg: 'No existe un usuario con ese uid'
            });
        }


        await Usuario.findByIdAndDelete(uid);

        res.status(200).json({
            ok: true,
            msg: 'Usuario eliminado satisfactoriamente',
            uid
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error en metodo delete de usuarios' + error
        });

    }


}



module.exports = {
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    borrarUsuario
}