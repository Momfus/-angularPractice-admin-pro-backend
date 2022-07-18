/*

   Ruta: /api/uploads/

*/

const { Router } = require('express');

const expressFileUpload = require('express-fileupload'); // Libreria que ayuda a hacer más fácil el cargar archivos: npm i express-fileupload

const { validarJWT } = require('../middlewares/validar-jsw');
const { fileUpload, retornaImagen } = require('../controllers/uploads.controller');

const router = Router();


router.use(expressFileUpload()); // Configuración por defecto del middleware

router.put('/:tipo/:id', validarJWT, fileUpload); // tipo = medico, usuario, hospital
router.get('/:tipo/:imagen', retornaImagen);

module.exports = router;