const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario.model');

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


const validarADMIN_ROLE = async(req, res, next) => { // Este es usado para impedir que un usuario común cambio el role de otro

   const uid = req.uid;

   try {
      
      const usuarioDB = await Usuario.findById(uid);

      if( !usuarioDB ) {

         return res.status(404).json({

            ok: false,
            msg: 'Usuario no existe'

         });

      }

      if( usuarioDB.role !== 'ADMIN_ROLE') {

         return res.status(404).json({

            ok: false,
            msg: 'No tiene privilegios para hacer eso'

         });

      }

      next();

   } catch (error) {
      
      console.log(error);
      res.status(500).json({
         ok: false,
         msg: 'Hable con el administrador'
      });

   }

};

const validarADMIN_ROLE_o_MismoUsuario = async(req, res, next) => { // USado para que pueda actualizarse a si mismo en caso de no ser ADMIN_ROLE
   
   const uid = req.uid;
   const id = req.params.id;

   try {
      
      const usuarioDB = await Usuario.findById(uid);

      if( !usuarioDB ) {

         return res.status(404).json({

            ok: false,
            msg: 'Usuario no existe'

         });

      }

      if( usuarioDB.role === 'ADMIN_ROLE' || uid === id) {

         next(); // Se cumple la condición

      } else {
         return res.status(404).json({

            ok: false,
            msg: 'No tiene privilegios para hacer eso'

         });
      }

   } catch (error) {
      
      console.log(error);
      res.status(500).json({
         ok: false,
         msg: 'Hable con el administrador'
      });

   }

};

module.exports = {
   validarJWT,
   validarADMIN_ROLE,
   validarADMIN_ROLE_o_MismoUsuario
};