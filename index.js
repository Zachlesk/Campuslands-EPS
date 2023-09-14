const express = require('express');
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
const port = process.env.PORT;
const mongoURI = process.env.MONGO_URI;

const client = new MongoClient(mongoURI, { useUnifiedTopology: true });

const collectionPacientes = client.db("Campuslands-EPS").collection('pacientes');
const collectionMedicos = client.db("Campuslands-EPS").collection('medicos');
const collectionCitas  = client.db("Campuslands-EPS").collection('citas');
const collectionAcudientes  = client.db("Campuslands-EPS").collection('acudientes');

app.use(express.json());

// 1
app.get('/pacientes/alfabetico', async (req, res) => {
  try {
    await client.connect();
    const pacientes = await collectionPacientes.find().sort({ usu_nombre: 1 }).toArray();
    res.json(pacientes);
  } catch (error) {
    console.error(error);
}});

// 2

app.get('/citas/:cit_fecha', async (req, res) => {
    const cit_fecha = req.params.cit_fecha;
    try {
      await client.connect();
      const citas = await collectionCitas.find({ cit_fecha }).sort({ 'cit_datosUsuario': 1 }).toArray();
      res.json(citas);
    } catch (error) {
      console.error(error);
    } 
  });

  // 3
  
  app.get('/medicos/:med_especialidad', async (req, res) => {
    const med_especialidad = req.params.med_especialidad;
    try {
      await client.connect();
      const medicos = await collectionMedicos.find({ med_especialidad }).toArray();
      res.json(medicos);
    } catch (error) {
      console.error(error);
    } 
  });

  // 4
  
  app.get('/proxima-cita/:cit_datosUsuario', async (req, res) => {
    const cit_datosUsuario = req.params.cit_datosUsuario;
    try {
      await client.connect();
      const today = new Date();
      const cita = await collectionCitas.findOne({ cit_datosUsuario: cit_datosUsuario,
        cit_fecha: { $gte: today },
      }, { sort: { cit_fecha: 1 } });
      res.json(cita);
    } catch (error) {
      console.error(error);
    }
  });

  // 5
  
  app.get('/pacientes-por-medico/:cit_medico', async (req, res) => {
    const cit_medico = req.params.cit_medico;
    try {
      await client.connect();
      const pacientes = await collectionCitas.distinct('paciente', { cit_medico: cit_medico });
      res.json(pacientes);
    } catch (error) {
      console.error(error);
    }
  });

  // 6
  
  app.get('/citas-por-fecha/:cit_fecha', async (req, res) => {
    const cit_fecha = req.params.cit_fecha;
    try {
      await client.connect();
      const citas = await collectionCitas.find({ cit_fecha }).toArray();
      res.json(citas);
    } catch (error) {
      console.error(error);
    }
  });

  // 7
  
  app.get('/medicos-con-consultorios', async (req, res) => {
    try {
      await client.connect();
      const medicos = await collectionMedicos.aggregate([
        { $lookup: { from: 'consultorios', localField: 'cons_consultorio', foreignField: '_id', as: 'med_consultorio', }}]).toArray();
        res.json(medicos);
    } catch (error) {
      console.error(error);
    }
  });


  // 8

  app.get('/citas-por-medico-y-fecha/:cit_medico/:cit_fecha', async (req, res) => {
    const cit_medico = req.params.cit_medico;
    const cit_fecha = req.params.cit_fecha;
    try {
      await client.connect();
      const citas = await collectionCitas.countDocuments({ cit_medico: cit_medico, cit_fecha });
      res.json(citas);
    } catch (error) {
      console.error(error);
    }
  });
  

  

app.listen(port, () => {
  console.log(`Servidor listening on ${port}`);
});
