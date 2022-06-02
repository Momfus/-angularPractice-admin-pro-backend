// La configuración de mongoose (usado para facilitar los schemas y conexión a mongoDB)

const mongoose = require('mongoose');

const dbConnection = async() => { // Retorna una promesa

   try {

      await mongoose.connect( process.env.DB_CNN );

      console.log('DB Online');

   } catch(error) {
      console.log(error);
      throw new Error('Error a la hora de iniciar la BD. Ver logs');
   }


};

// Exportar la referencia a la conexión creada.
module.exports = {

   dbConnection

};