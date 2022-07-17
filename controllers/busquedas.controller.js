
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

// En una colección específica
const getDocumentosColeccion = async (req, res = response) => {

   const tabla = req.params.tabla;
   const busqueda = req.params.busqueda;
   const regex = new RegExp( busqueda, 'i' ); // i = insensible (agregar todas las banderas)

   let data = [];

   switch(tabla) {

      case 'medicos': {

         data = await Medico.find({  nombre: regex  })
                           .populate('usuario', 'nombre img')
                           .populate('hospital', 'nombre img');
         break;

      }

      case 'hospitales': {

         data = await Hospital.find({  nombre: regex  })
                              .populate('usuario', 'nombre img');
         break;
      }

      case 'usuarios': {

         data = await Usuario.find({  nombre: regex  });
         break;
      }

      default: { // Se corta en este punto y no continua en este caso.
         return res.status(400).json({
            ok: false,
            msg: 'La tabla tiene que ser usuarios/medicos/hospitales'
         });
      }

   }

   // De no haber error, devuelve los resultados
   res.json({
      ok: true,
      resultados: data
   });

};


module.exports = {
   getTodo,
   getDocumentosColeccion
};