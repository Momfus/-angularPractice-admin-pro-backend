/*

   Ruta: /api/usuarios

*/

const { Router } = require('express');
const { getUsuarios, crearUsuario } = require('../controllers/usuarios.controller');

const router = Router();

router.get('/', getUsuarios);

router.post('/', crearUsuario);

module.exports = router;