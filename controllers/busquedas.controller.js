
// Metodo getTodo (requiere token) imprimir la busqueda en console log

const { response } = require('express');
const Usuario = require('../models/usuario.model');
const Medico = require('../models/medico.model');
const Hospital = require('../models/hospital.model');

// Obtener datos que coincidan con cierto parámetro

const getTodo = async (req, res = response) => {

   const busqueda = req.params.busqueda;
   const regex = new RegExp( busqueda, 'i' ); // i = insensible (agregar todas las banderas)

   /// Hacer todas las peticiones de una vez y destructurarlas en orden (de esa manera no hacerlo uno por uno cada búsqueda, es más eficiente)
   const [usuarios, medicos, hospitales ] = await Promise.all([
      Usuario.find({  nombre: regex  }),
      Medico.find({  nombre: regex  }),
      Hospital.find({  nombre: regex  }),
   ]);

   res.json({
      ok:true,
      usuarios,
      medicos,
      hospitales
   });

};


module.exports = {
   getTodo
};