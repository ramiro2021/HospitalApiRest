// ruta /api/hospitales

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getMedicos, crearMedico, actualizarMedico, borrarMedico } = require('../controllers/medicos');

const router = Router();


// ruta /api/medicos
// validarJWT
router.get('/', getMedicos);
// ruta /api/medicos
// campos validados con middleware personalizado => ../middlewares/validar-campos
router.post(
    '/',
    [
    ]
    , crearMedico);

// ruta /api/medicos/:id
router.put('/:id', [
], actualizarMedico);

// ruta /api/medicos/:id
// , validarJWT
router.delete('/:id', borrarMedico);


module.exports = router;