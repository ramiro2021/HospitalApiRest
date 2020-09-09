const { response } = require('express');
const { validationResult } = require('express-validator');

const validarCampos = (req, res = response, next) => {
    // traer errores del middleware 
    const errores = validationResult(req);
    // si hay errores de validacion
    if (!errores.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: errores.mapped()
        });
    }

    next();
}


module.exports = {
    validarCampos
}