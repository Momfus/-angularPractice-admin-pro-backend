/*

   Ruta: /api/todo/:busqueda

*/

const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jsw');

const {

   getTodo,
   getDocumentosColeccion

} = require('../controllers/busquedas.controller');

const router = Router();

router.get('/:busqueda', validarJWT, getTodo);
router.get('/coleccion/:tabla/:busqueda', validarJWT, getDocumentosColeccion); // Para buscar en una tabla específica

module.exports = router;