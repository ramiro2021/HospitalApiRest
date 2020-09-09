const { Router } = require('express');
const { getUsuarios, crearUsuario } = require('../controllers/usuarios');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();


// Ruta /api/usuario
router.get('/', getUsuarios);

// campos validados con middleware personalizado => ../middlewares/validar-campos
router.post(
    '/',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'La password es obligatoria').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        validarCampos,
    ]
    , crearUsuario);


module.exports = router;