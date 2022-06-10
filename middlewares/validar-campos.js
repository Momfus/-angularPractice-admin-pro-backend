
const {response} = require('express');
const { validationResult } = require('express-validator'); // Para el paquete de validaciones se instala npm i express-validator

const validarCampos = (req, res = response, next) => { // next se dispara una vez se cumple el middleware validarCampos

   const errores = validationResult( req ); // Errores traidos del middleware en la ruta

   if( !errores.isEmpty() ) {
      return res.status(400).json({
         ok: false,
         errors: errores.mapped()
      });
   }

   next(); // De no haber errores, pasa al siguiente

};


module.exports = {
   validarCampos
};
