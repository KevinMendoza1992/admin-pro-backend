/**
    RUTA: api/hospitales
 */

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos')

const { validarJWT } = require ('../middlewares/validar-jwt');

const router = Router();

const { getMedicos, crearMedico, actualizarMedico, borrarMedico } = require('../controllers/medicos.controller');

router.get('/', validarJWT, getMedicos);

router.post('/', 
    [
        validarJWT,
        check('nombre', 'El nombre del medico es obligatorio').not().isEmpty(),
        check('hospital', 'El hospital id de ser valido').isMongoId(),
        validarCampos
    ],
    crearMedico);

router.put('/:id',
    [
        
    ],actualizarMedico);

router.delete('/:id', borrarMedico);

module.exports = router;