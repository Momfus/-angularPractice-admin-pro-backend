
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
const crearUsuario = async(req, res) => {

   const { email, password, nombre } = req.body;

   const usuario = new Usuario( req.body );

   await usuario.save(); // Con await se espera que la promesa save se termine primero (para usarlo debe estar en una función async)

   res.json( {

      ok: true,
      usuario // colocarlo solo, si se llaman igual, es lo mismo que colocar usuario: usuario

   } );

};

module.exports = {
   getUsuarios,
   crearUsuario
};