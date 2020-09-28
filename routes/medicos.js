// ruta /api/hospitales

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getMedicos, crearMedico, actualizarMedico, borrarMedico } = require('../controllers/medicos');

const router = Router();


// ruta /api/medicos
// validarJWT
router.get('/',
    [
        validarJWT,
    ], getMedicos);
// ruta /api/medicos
// campos validados con middleware personalizado => ../middlewares/validar-campos
router.post(
    '/',
    [
        validarJWT,
        check('nombre', 'el nombre del medico es necesario').not().isEmpty(),
        check('hospital', "el hospital id debe ser valido").isMongoId(),
        validarCampos
    ]
    , crearMedico);

// ruta /api/medicos/:id
router.put('/:id', [
    validarJWT,
    check('nombre', 'el nombre del medico es necesario').not().isEmpty(),
    check('hospital', "el hospital id debe ser valido").isMongoId(),
    validarCampos
], actualizarMedico);

// ruta /api/medicos/:id
// , validarJWT
router.delete('/:id', validarJWT, borrarMedico);


module.exports = router;