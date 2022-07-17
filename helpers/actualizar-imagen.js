
const fs = require('fs'); // Se puede leer el filesystem (carpetas y archivos)
const mongoose = require('mongoose');

const Usuario = require('../models/usuario.model');
const Medico = require('../models/medico.model');
const Hospital = require('../models/hospital.model');


const validateMongoID = (mongoid) => {
   return mongoose.Types.ObjectId.isValid(mongoid);
};

const borrarImagen = (path) => {

   if( fs.existsSync( path )) {
      fs.unlinkSync(path); // borrar la imagen
   }


};

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
         borrarImagen( pathViejo );

         medico.img = nombreArchivo;
         await medico.save();
         return true;

         

  
         break; // Hay returns asi que no hace falta esto
      }

      case 'hospitales': {

         const hospital = await Hospital.findById( id );

         // En caso que no sea correcto el Id
         if( !hospital ) {
            console.log('No se encontró hospital por id');
            return false;
         }

         // Si se encuentra, borrar la que esta y colocar el nuevo
         const pathViejo = `./uploads/hospitales/${hospital.img}`;
         borrarImagen( pathViejo );

         hospital.img = nombreArchivo;
         await hospital.save();
         return true;

         break;
      }

      case 'usuarios': {

         const usuario = await Usuario.findById( id );

         // En caso que no sea correcto el Id
         if( !usuario ) {
            console.log('No se encontró usuario por id');
            return false;
         }

         // Si se encuentra, borrar la que esta y colocar el nuevo
         const pathViejo = `./uploads/usuarios/${usuario.img}`;
         borrarImagen( pathViejo );

         usuario.img = nombreArchivo;
         await usuario.save();
         return true;

         break;
      }
   }

};


module.exports = {
   actualizarImagen,
   validateMongoID
};