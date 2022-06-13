const { response } = require('express');
const bcrypt = require('bcryptjs'); // Se usa para encriptar contraseñas y se instala con npm i bcryptjs


const Usuario = require('../models/usuario.model');

// Funciones para exportar
const getUsuarios = async (req, res) => {

   const usuarios= await Usuario.find({}, // Esperar a que obtenga los usuarios (se puede especificar para que devuelva lo que me interesa nomás)
      'nombre email role google'   
   ); 

   res.json( {

      ok: true,
      usuarios // usuarios: usuarios

   } );

};


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
   
      res.json( {
   
         ok: true,
         usuario // colocarlo solo, si se llaman igual, es lo mismo que colocar usuario: usuario
   
      } );

   } catch(error) {
      console.log(error);
      res.status(500).json({
         ok: false,
         msg: 'Error inesperado. Revisar logs'
      })

   }


};


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
      const campos = req.body;

      // Verificar que sea el mail que quiere cambiar diferente al ingresado (ya que es único)
      if( usuarioDB.email === req.body.email ) {
         delete campos.email;
      } else {

         // Se fija primero que no exista en otro usuario antes de cambiarlo
         const existeEmail = await Usuario.findOne({email: req.body.email});

         if( existeEmail ) {
            return res.status(400).json({
               ok: false,
               msg: 'Ya existe un usuario con ese email'
            });
         }

      }

      delete campos.password; // Dato que no requiero aun si lo manda el usuario
      delete campos.google; // Dato que no requiero aun si lo manda el usuario

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

module.exports = {
   getUsuarios,
   crearUsuario,
   actualizarUsuario
};