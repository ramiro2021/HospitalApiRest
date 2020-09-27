
const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getTodo, getDocumentosColeccion } = require('../controllers/busquedas');

const router = Router();


// ruta: api/todo/:busqueda
// validarJWT
router.get('/:busqueda', [validarJWT], getTodo);

router.get('/coleccion/:tabla/:busqueda', [validarJWT], getDocumentosColeccion);


module.exports = router;