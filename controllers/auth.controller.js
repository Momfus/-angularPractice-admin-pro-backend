const {response} = require('express');
const bcrypt = require('bcryptjs'); // Se usa para encriptar contraseñas y se instala con npm i bcryptjs

const Usuario = require('../models/usuario.model');
const { generarJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');
const { getMenuFrontEnd } = require('../helpers/menu-frontend');

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
         token,
         menu: getMenuFrontEnd( usuarioDB.role )
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

      // Verificar si existe el email
      const usuarioDB = await Usuario.findOne({ email });

      let usuario;

      if( !usuarioDB ) {
         usuario = new Usuario({
            nombre: name,
            email, // email:email
            password: '@@@', // Es solo para indicar que es requerido, el mismo se hace por un hash asi que no es que usará este
            img: picture,
            google: true
         });
      } else {

         usuario = usuarioDB; // En caso que existe, ya se carga con los datos que tiene.
         usuario.google = true;

      }

      // Almacenarlo fisicamente en la base de datos
      await usuario.save();

      // Generar json web token (JWT)
      const token = await generarJWT( usuario.id );
      // console.log(req.body.token);

      res.json({
         ok: true,
         email, name, picture, token // y aca se colocaria si hubiera usado variable para tener todo, simplemente googleUser
      });
      
   } catch (error) {

      console.log(error);
      res.status(400).json({
         ok: false,
         msg: 'Token de google no es correcto'
      });

   }


};

const renewToken = async(req, res = response ) => {

   const uid = req.uid;

   // Generar el TOKEN - JWT --> El token sirve para tener de forma pasiva el estado del usuario
   const token = await generarJWT( uid ); // Es lo que necesito para generar un nuevo token (el id en este caso)

   // Obtener usuario por UID
   const usuario = await Usuario.findById(uid);

   res.json({
      ok: true,
      token,
      usuario,
      menu: getMenuFrontEnd( usuario.role )
   });

};

module.exports =  {
   login,
   googleSignIn,
   renewToken
};