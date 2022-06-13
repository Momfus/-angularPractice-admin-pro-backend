
const { Schema, model } = require('mongoose');

// Definir modelo
const UsuarioSchema = Schema({

   nombre: {

     type: String,
     required: true 

   },
   email: {

      type: String,
      required: true,
      unique: true

   },
   password: {

      type: String,
      required: true

   },
   img: {

      type: String

   },
   role: {

      type: String,
      required: true,
      default: 'USER_ROLE'

   },
   google: {

      type: Boolean,
      default: false

   },

});

// Sobreescribir como devuelve algunos atributos
UsuarioSchema.method('toJSON', function(){

   const{ __v, _id, password, ...object } = this.toObject(); // Obtener la instancia actual y extraigo los atributos a cambiar (...object es obtener el restro de los atributos definidos)

   object.uid = _id;

   return object;

} );


// Exportarlo para usarse
module.exports = model('Usuario', UsuarioSchema); // Por defecto, moongose le agrega la "s" en plural (se puede configurar eso)