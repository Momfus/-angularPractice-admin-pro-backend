const {response} = require('express');
const bcrypt = require('bcryptjs'); // Se usa para encriptar contraseñas y se instala con npm i bcryptjs

const Usuario = require('../models/usuario.model');
const { generarJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');

const login = async(req, res = response ) => {


   const {email, password } = req.body;

   try {
      
      // Verificar email
      const usuarioDB = await Usuario.findOne({ email });

      if( !usuarioDB ) {
         return res.status(404).json({
            ok: false,
            msg: 'Email no encontrada' // Aca porque tutorial pero es buena práctica no dar pistas sobre que fue mal (sino algo mas general)
         });
      }

      // Verificar contraseña
      const validPassword = bcrypt.compareSync( password, usuarioDB.password ); // Desencripta contraseña

      if( !validPassword ) {
         return res.status(400).json({
            ok: false,
            msg: 'Contraseña no valida'
         });
      }

      // Generar el TOKEN - JWT --> El token sirve para tener de forma pasiva el estado del usuario
      const token = await generarJWT( usuarioDB.id );


      res.json({
         ok: true,
         token
      });

   } catch (error) {
      
      console.log(error);
      res.status(500).json({
         ok: false,
         msg: 'Hable con el administrador'
      });
      
   }

};

// Este es para el login con google
const googleSignIn = async(req, res = response ) => {
   
   try {
      
      const { email, name, picture } = await googleVerify( req.body.token ); // para obtener todo es colocar nomas una variable (como googleUser) pero para algunas cosas específicas desestructuro


      res.json({
         ok: true,
         email, name, picture // y aca se colocaria si hubiera usado variable para tener todo, simplemente googleUser
      });
      
   } catch (error) {

      console.log(error);
      res.status(400).json({
         ok: false,
         msg: 'Token de google no es correcto'
      });

   }


};

module.exports =  {
   login,
   googleSignIn
};