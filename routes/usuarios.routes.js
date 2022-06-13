/*

   Ruta: /api/usuarios

*/

const { Router } = require('express');
const { check } = require('express-validator'); // Para el paquete de validaciones se instala npm i express-validator
const {validarCampos} = require('../middlewares/validar-campos')

const { getUsuarios, crearUsuario, actualizarUsuario, borrarUsuario } = require('../controllers/usuarios.controller');

const router = Router();

router.get('/', getUsuarios);

router.post('/', 
   [ // Middlewares
      check('nombre', 'El nombre es obligatorio').not().isEmpty(),
      check('password', 'El password es obligatorio').not().isEmpty(),
      check('email', 'El email es obligatorio').isEmail(),
      validarCampos // Siempre debe estar al final de los check asi se declaran primero las definiciones de validaciones
   ],
   crearUsuario
);

router.put('/:id', 
   [
      check('nombre', 'El nombre es obligatorio').not().isEmpty(),
      check('email', 'El email es obligatorio').isEmail(),
      check('role', 'El role es obligatorio').not().isEmpty(),
      validarCampos
   ], 
   actualizarUsuario
);

router.delete('/:id', 
   borrarUsuario 
);

module.exports = router;