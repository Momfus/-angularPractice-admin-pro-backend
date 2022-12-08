
const { response } = require('express');

const Medico = require('../models/medico.model');

const getMedicos = async (req, res = response) => {

   const desde= Number(req.query.desde ) || 0; // Caso que no se mande el valor o no sea un número, se envia un 0

   const [medicos, total] = await Promise.all([

      Medico
      .find( {}, 'nombre img usuario hospital')
      .populate('usuario', 'nombre img')
      .populate('hospital', 'nombre img')
      .skip(desde)
      .limit( 5 ),

      Medico.countDocuments()
   ]);
   
   res.json({
      ok: true,
      total,
      medicos
   });

};

const getMedicoById = async (req, res = response) => {

   const id = req.params.id;

   try {

      const medico = await Medico.findById( id )
                                    .populate('usuario', 'nombre img')
                                    .populate('hospital', 'nombre img');
   
      res.json({
         ok: true,
         medico
      });
      
   } catch (error) {
      
      console.log(error);
      res.status(500).json({
         ok: false,
         msg: 'Hable con el administrador'
      });

   }

};


const crearMedico = async (req, res = response) => {

   const uid = req.uid;

   

   const medico = new Medico({
      usuario: uid,
      ...req.body
   });
   
   try {
      
      const medicoDB = await medico.save();

      res.json({
         ok: true,
         medico: medicoDB
      });

   } catch (error) {

      console.log(error);
      res.status(500).json({
         ok: false,
         msg: 'Hable con el administrador'
      });

   }

};


const actualizarMedico = async(req, res = response) => {

   const id = req.params.id;
   const uid = req.params.uid;


   try {
      
      const medicoDB = await Medico.findById( id );

      // En caso que no exista en el DB
      if( !medicoDB ) {
         return res.status(404).json({
            ok: true,
            msg: "Medico no encontrado"
         });
      }

      // Actualizar Medico
      const cambiosMedico = {
         ...req.body,
         usuario: uid
      };

      const medicoActualizado = await Medico.findByIdAndUpdate(id, cambiosMedico, {new: true });

      res.json({
         ok: true,
         medico: medicoActualizado
      });
      
   } catch (error) {

      console.log(error);

      res.status(500).json({
         ok: false,
         msg: 'Hable con el administrador'
      });

   }
};

const borrarMedico = async(req, res = response) => {

   const id = req.params.id;

   try {
      
      const medicoDB = await Medico.findById( id );

      // En caso que no exista en el DB
      if( !medicoDB ) {
         return res.status(404).json({
            ok: true,
            msg: "Medico no encontrado"
         });
      }

      // Borrar Medico
      await Medico.findByIdAndDelete(id);

      res.json({
         ok: true,
         msg: 'Médico eliminado'
      });

   } catch (error) {
      
      console.log(error);
      
      res.status(505).json({
         ok: false,
         msg: 'Hable con el administrador'
      });
   }
   
};

module.exports = {
   getMedicos,
   getMedicoById,
   crearMedico,
   actualizarMedico,
   borrarMedico
};