/*

   Medicos
   Ruta: '/api/Medicos

*/

const { Router } = require('express');
const { check } = require('express-validator'); // Para el paquete de validaciones se instala npm i express-validator
const {validarCampos} = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jsw');

const {
   getMedicos,
   crearMedico,
   actualizarMedico,
   borrarMedico
} = require('../controllers/medicos.controllers');

const router = Router();

router.get('/', getMedicos);

router.post('/', 
   [ // Middlewares
      validarJWT,
      check('nombre', 'El nombre del médico es necesario').not().isEmpty(),
      check('hospital', 'El hospital id debe ser válido').isMongoId(),
      validarCampos
   ],
   crearMedico
);

router.put('/:id', 
   [

   ], 
   actualizarMedico
);

router.delete('/:id', 
   borrarMedico 
);

module.exports = router;