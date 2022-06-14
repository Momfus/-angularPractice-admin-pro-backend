/*

   Ruta: /api/hospitales

*/


const { Router } = require('express');
const { check } = require('express-validator'); // Para el paquete de validaciones se instala npm i express-validator
const {validarCampos} = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jsw');

const {
   getHospitales,
   crearHospital,
   actualizarHospital,
   borrarHospital
} = require('../controllers/hospitales.controller');

const router = Router();

router.get('/', getHospitales);

router.post('/', 
   [ // Middlewares
   ],
   crearHospital
);

router.put('/:id', 
   [

   ], 
   actualizarHospital
);

router.delete('/:id', 
   borrarHospital
);

module.exports = router;