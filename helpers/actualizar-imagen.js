const Usuario = require('../models/usuario');
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');
const fs = require('fs');

const borrarImagen = (path) => {

    if (fs.existsSync(path)) {
        // borrar la imagen anterior si es que existe
        fs.unlinkSync(path)
    }
}


const actualizarImagen = async (tipo, id, nombreArchivo) => {
    let pathViejo = '';
    switch (tipo) {
        case 'medicos':
            const medico = await Medico.findById(id);
            if (!medico) {
                console.log('medico id no existe');
                return false;
            }

            // verificar la imagen vieja del medico y si existe borrarla
            pathViejo = `./uploads/medicos/${medico.img}`;
            borrarImagen(pathViejo);

            medico.img = nombreArchivo;

            await medico.save();
            return true;
            break;
        case 'hospitales':
            const hospital = await Hospital.findById(id);
            if (!hospital) {
                console.log('hospital id no existe');
                return false;
            }

            // verificar la imagen vieja del hospital y si existe borrarla
            pathViejo = `./uploads/hospitales/${hospital.img}`;
            borrarImagen(pathViejo);

            hospital.img = nombreArchivo;

            await hospital.save();
            return true;
            break;

        case 'usuarios':
            const usuario = await Usuario.findById(id);
            if (!usuario) {
                console.log('usuario id no existe');
                return false;
            }

            // verificar la imagen vieja del usuario y si existe borrarla
            pathViejo = `./uploads/usuarios/${usuario.img}`;
            borrarImagen(pathViejo);

            usuario.img = nombreArchivo;

            await usuario.save();
            return true;
            break;
        default:
            break;
    }
}

module.exports = {
    actualizarImagen
}