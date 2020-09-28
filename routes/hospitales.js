

// ruta /api/hospitales

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getHospitales, crearHospital, actualizarHospital, borrarHospital } = require('../controllers/hospitales');

const router = Router();


// ruta /api/hospitales
// validarJWT
router.get('/', [validarJWT], getHospitales);
// ruta /api/hospitales
// campos validados con middleware personalizado => ../middlewares/validar-campos
router.post(
    '/',
    [
        validarJWT,
        check('nombre', 'el nombre del hospital es necesario').not().isEmpty(),
        validarCampos
    ]
    , crearHospital);

// ruta /api/hospitales/:id
router.put('/:id', [
    validarJWT,
    check('nombre', 'el nombre del hospital es necesario').not().isEmpty(),
    validarCampos
], actualizarHospital);

// ruta /api/hospitales/:id
// , validarJWT
router.delete('/:id', validarJWT, borrarHospital);


module.exports = router;