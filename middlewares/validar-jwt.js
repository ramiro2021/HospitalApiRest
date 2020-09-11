const { response } = require('express');
const jwt = require('jsonwebtoken');



const validarJWT = (req, res = response, next) => {


    // Leer token
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'no hay un token para este usuario'
        })
    }

    try {
        // verifico el token con mi pw secreta en .env
        const { uid } = jwt.verify(token, process.env.JWT_SECRET);

        req.uid = uid;
        next();

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no valido'
        })
    }



}


module.exports = {
    validarJWT
}