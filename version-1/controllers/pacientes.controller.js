import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);
const collection = client.db('Campuslands-EPS').collection('pacientes')

export const ordenAlfabetico = async(req, res)=>{
    try {
        const pacientes = await collection.find().sort( {usu_nombre: 1}).toArray();
        console.log(pacientes)
    } catch (error) {
        console.error('Error:', error);
    }
}

  

