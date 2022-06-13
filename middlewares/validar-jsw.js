const jwt = require('jsonwebtoken');

const validarJWT = ( req, res, next ) => {

   // Leer el Token
   const token = req.header('x-token');

   // Verificar que haya un token enviado
   if( !token ) {

      return res.status(401).json({
         ok: false,
         msg: 'No hay token en la petición'
      });

   }


   try {

      const { uid } = jwt.verify( token, process.env.JSW_SECRET_KEY ); // Intenta conseguir el uid del usuario, si no es correcto salta al catch

      req.uid = uid;
      next();

   } catch(error) {
      return res.status(401).json({
         ok: false,
         msg: 'Token no válido'
      });
   }

};

module.exports = {
   validarJWT
};