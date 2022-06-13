


const jwt = require('jsonwebtoken'); // Se instala con npm i jsonwebtoken

const generarJWT = ( uid ) => {

   return new Promise( ( resolve, reject) => { // De esa manera puedo usarlo despues con un await en async

      const payload = {
   
         uid
   
      };
   
      jwt.sign( payload,  process.env.JSW_SECRET_KEY, {
   
         expiresIn: '24h'
   
      }, (err, token) => {
   
         if( err ) {

            // Error
            console.log(err);
            reject('No se pudo generar el JWT');

         } else {

            // Success
            resolve( token );
         }
   
      });

   });


};

module.exports = {
   generarJWT
};