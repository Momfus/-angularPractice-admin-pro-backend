const { response } = require('express');
const bcrypt = require('bcryptjs'); // Se usa para encriptar contraseñas y se instala con npm i bcryptjs
const { generarJWT } = require('../helpers/jwt');

const Usuario = require('../models/usuario.model');

// Funciones para exportar

// OBTENER
const getUsuarios = async (req, res) => {

   const desde = Number(req.query.desde) || 0; // Caso que no se mande el valor o no sea un número, se envia un 0


   /// Manera secuencial (uno a uno con dos await)
   // const usuarios= await Usuario // Esperar a que obtenga los usuarios (se puede especificar para que devuelva lo que me interesa nomás)
   //                      .find({}, 'nombre email role google')
   //                      .skip( desde )
   //                      .limit( 5 ); // Puede hacerse sino por argumento o cambiar al que se requiera

   // const total = await Usuario.count();

   // En conjunto
   const [usuarios, total] = await Promise.all([ // Ejecutar todas estas promesas

      // Primera posición de lo que devuelve
      Usuario 
            .find({}, 'nombre email role google')
            .skip( desde )
            .limit( 5 ),
      
      // Segunda posición de lo que devuelve
      Usuario.countDocuments()

   ]);

   res.json( {

      ok: true,
      total,
      usuarios // usuarios: usuarios

   } );

};

// CREAR
const crearUsuario = async(req, res = response ) => { // "response" se trae de libreria de express para que tenga los autocompletados generales (como los usados en el catch de más abajo)

   const { email, password } = req.body;


   // Manejo de errores generales
   try {

      // Manejar errores como que hay un usuario duplicado por un campo único (email)
      const existeEmail = await Usuario.findOne({ email }); // Trae el campo email del body

      if( existeEmail ) {
         return res.status(400).json({
            ok: false,
            msg: "El correo ingresado ya esta registrado"
         });
      }

      const usuario = new Usuario( req.body );

      // Encriptar contraseña
      const salt =  bcrypt.genSaltSync();// Número o data generado de forma aleatoria
      usuario.password = bcrypt.hashSync( password, salt);

      // Guardar Usuario
      await usuario.save(); // Con await se espera que la promesa save se termine primero (para usarlo debe estar en una función async)
   
      // Generar el TOKEN - JWT --> El token sirve para tener de forma pasiva el estado del usuario
      const token = await generarJWT( usuario.id );

      res.json( {
   
         ok: true,
         usuario, // colocarlo solo, si se llaman igual, es lo mismo que colocar usuario: usuario
         token
      } );

   } catch(error) {
      console.log(error);
      res.status(500).json({
         ok: false,
         msg: 'Error inesperado. Revisar logs'
      });

   }


};

// ACTUALIZAR
const actualizarUsuario = async( req, res = response ) => {

   // TODO: Validar token y comprobar si es el usuario correcto
   
   const uid = req.params.id;
   
   try {

      const usuarioDB = await Usuario.findById( uid );

      if( !usuarioDB ) {
         return res.status(404).json({
            ok: false,
            msg: 'No existe un usuario por ese id'
         });
      }

      // Actualizaciones
      const {password, google, email, ...campos} = req.body; // Extraigo los elementos que me interesan

       // Se fija primero que no exista en otro usuario antes de cambiarlo
      if( usuarioDB.email != email ) {

         const existeEmail = await Usuario.findOne({email});

         if( existeEmail ) {
            return res.status(400).json({
               ok: false,
               msg: 'Ya existe un usuario con ese email'
            });
         }

      }

      campos.email = email;
      const usuarioActualizado = await Usuario.findByIdAndUpdate( uid, campos, { new: true });

      res.json({
         ok: true,
         usuario: usuarioActualizado
      });
      
   } catch (error) {
      
      console.log(error);
      res.status(500).json({
         ok: false,
         msg: 'Error inesperado'
      });

   }

};

// BORRAR
const borrarUsuario = async(req, res = response) => {

   const uid = req.params.id;

   try {
      
      const usuarioDB = await Usuario.findById( uid );

      if( !usuarioDB ) {
         return res.status(404).json({
            ok: false,
            msg: 'No existe un usuario por ese id'
         });
      }

      await Usuario.findOneAndDelete( uid );

      res.json({
         ok: true,
         msg: 'Usuario eliminado'
      });
   
   } catch (error) {
      
      console.log(error);
      res.status(500).json({
         ok: false,
         msg: 'Hable con el administrador'
      });

   }

};

module.exports = {
   getUsuarios,
   crearUsuario,
   actualizarUsuario,
   borrarUsuario
};