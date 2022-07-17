
const fs = require('fs'); // Se puede leer el filesystem (carpetas y archivos)

const Usuario = require('../models/usuario.model');
const Medico = require('../models/medico.model');
const Hospital = require('../models/hospital.model');

const actualizarImagen = async(tipo, id, nombreArchivo) => {

   switch( tipo ) {
      case 'medicos': {

         const medico = await Medico.findById( id );

         // En caso que no sea correcto el Id
         if( !medico ) {
            console.log('No se encontró médico por id');
            return false;
         }

         // Si se encuentra, borrar la que esta y colocar el nuevo
         const pathViejo = `./uploads/medicos/${medico.img}`;

         if( fs.existsSync( pathViejo )) {
            fs.unlinkSync(pathViejo); // borrar la imagen anterior
         }

         medico.img = nombreArchivo;
         await medico.save();
         return true;

         // break; // Hay returns asi que no hace falta esto
      }

      case 'hospitales': {


         break;
      }

      case 'usuarios': {

         break;
      }
   }

};


module.exports = {
   actualizarImagen
};