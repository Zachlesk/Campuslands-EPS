import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);
const collection = client.db('Campuslands-EPS').collection('medico')

export const medicoEspecialidad = async(req, res)=>{
        const especialidad = req.params.med_especialidad;
        try {
          const medicos = await collection.find({ especialidad }).toArray();
          res.json(medicos);
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Error de servidor' });
        } finally {
          client.close();
        }
};

/* export const medicosConsultorios = async (req, res) => {
    try {
      const medicos = await collection.aggregate([
        { $lookup: { from: 'consultorios',
            localField: 'consultorio',
            foreignField: '_id',
            as: 'consultorio',
          },
        },
      ]).toArray();
      res.json(medicos);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error de servidor' });
    }
}
 */
