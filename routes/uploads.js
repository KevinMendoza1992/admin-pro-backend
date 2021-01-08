/*
    RUTA: /api/uploads/
*/

const { Router } = require('express');
/* Ponemos el middleware de express upload */
const expressFileUpload = require('express-fileupload');

const { fileUpload, retornaImagen } = require('../controllers/uploads.controller');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

/*Middleware con la configuracion por defecto */
router.use(expressFileUpload());

router.put('/:tipo/:id', validarJWT , fileUpload );

router.get('/:tipo/:foto', retornaImagen );

module.exports = router;