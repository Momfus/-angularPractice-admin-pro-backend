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
   borrarMedico,
   getMedicoById
} = require('../controllers/medicos.controllers');

const router = Router();

router.get('/', validarJWT, getMedicos);

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
      validarJWT,
      check('nombre', 'El nombre del médico es necesario').not().isEmpty(),
      check('hospital', 'El hospital id debe ser válido').isMongoId(),
      validarCampos
   ], 
   actualizarMedico
);

router.delete('/:id', 
   validarJWT,
   borrarMedico 
);

router.get('/:id', 
   validarJWT,
   getMedicoById 
);

module.exports = router;