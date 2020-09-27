const { response } = require('express');
const { v4: uuidv4 } = require('uuid');
const { actualizarImagen } = require('../helpers/actualizar-imagen');
const path = require('path');
const fs = require('fs');

const fileUpload = (req, res) => {

    const tipo = req.params.tipo;
    const id = req.params.id;

    const tiposValidos = ['hospitales', 'usuarios', 'medicos'];

    // validacion de tipos
    if (!tiposValidos.includes(tipo)) {
        return res.status(400).json({
            ok: false,
            msg: 'No se ah encontrado un tipo valido (medicos, usuarios, hospitales)'
        })
    }

    // verificar que no llegue un objeto vacio
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No hay ningun archivo'
        })
    }

    // Traer imagen
    const file = req.files.imagen;

    const nombreCortado = file.name.split('.');
    const extencionArchivo = nombreCortado[nombreCortado.length - 1];

    //Validar extension
    const extencionesValidas = ['png', 'jpg', 'jpeg', 'gif'];

    if (!extencionesValidas.includes(extencionArchivo)) {
        return res.status(400).json({
            ok: false,
            msg: 'La extencion del archivo no es valida'
        })
    }

    // Generar el nombre del archivo
    const nombreArchivo = `${uuidv4()}.${extencionArchivo}`;

    // Path para guardar la imagen
    const path = `./uploads/${tipo}/${nombreArchivo}`;

    // Mover la imagen
    file.mv(path, (err) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                ok: false,
                msg: 'Error al mover la imagen'
            });
        }

        // Actualizar bd
        actualizarImagen(tipo, id, nombreArchivo);

        res.status(200).json({
            ok: true,
            msg: 'Archivo subido',
            nombreArchivo
        })
    })

}


const retornaImagen = (req, res = response) => {
    const tipo = req.params.tipo;
    const foto = req.params.foto;
    const pathImg = path.join(__dirname, `../uploads/${tipo}/${foto}`);

    // imagen por defecto
    if (fs.existsSync(pathImg)) {
        res.sendFile(pathImg);
    } else {
        const pathImg = path.join(__dirname, `../uploads/no-img.jpg`);
        res.sendFile(pathImg);
    }

}



module.exports = {
    fileUpload,
    retornaImagen
}