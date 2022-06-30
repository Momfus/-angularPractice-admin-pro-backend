
// Metodo getTodo (requiere token) imprimir la busqueda en console log


// Obtener datos que coincidan con cierto parámetro

const getTodo = async (req, res) => {

   const busqueda = req.params.busqueda;

   res.json({
      ok:true,
      msg: 'getTodo',
      busqueda
   });

};


module.exports = {
   getTodo
};