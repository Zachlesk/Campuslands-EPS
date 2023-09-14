import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);
const collection = client.db('Campuslands-EPS').collection('citas')
const collectionPacientes = client.db('Campuslands-EPS').collection('pacientes')

export const citasConPacienteAlfabetico = async (req, res) => {
    const fecha = req.params.cit_fecha;
    try {
      const citas = await collection.find({ fecha }).sort({ 'usu_nombre': 1 }).toArray;
      res.json(citas);
    
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}


export const pacienteConCita =  async (req, res) => {
    const pacienteId = req.params._id;
    try {
      const today = new Date();
      const cita = await collection.findOne({ paciente: pacienteId, fecha: { $gte: today }}, { sort: { fecha: 1 } });
      res.json(cita);
    } catch (error) {
      console.error(error);2
      res.status(500).json({ error: 'Error de servidor' });

    }
}

export const pacientesConCitaMedico = async (req, res) => {
    const medicoId = req.params.medicoId;
    try {
      const pacientes = await collection.distinct('paciente', { medico: medicoId });
      res.json(pacientes);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error de servidor' });
    }
}

export const citasDiaEspecifico = async (req, res) => {
    const fecha = req.params.fecha;
    try {
      const citas = await collection.find({ fecha }).toArray();
      res.json(citas);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error de servidor' });
    }
}
  
/* 
export const medicoDiaEspecifico = async (req, res) => {
    const medicoId = req.params.medicoId;
    const fecha = req.params.fecha;
    try {
      await client.connect();
      const db = client.db();
      const numCitas = await db.collection('citas').countDocuments({ medico: medicoId, fecha });
      res.json({ numCitas });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error de servidor' });
    } finally {
      client.close();
    }
  });
   */