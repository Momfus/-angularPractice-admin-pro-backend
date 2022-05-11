// Ejectuo el script de nodemon index.js con el "npm run start:dev" (escrito en package.json)

const express = require('express'); // Idem a importar librerias

// Crear el servidor de express
const app = express();


app.listen( 3000, () => {
   console.log('Servidor corriendo en puerto ' + 3000);
} );