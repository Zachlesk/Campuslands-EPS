import express from 'express';
import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';

dotenv.config()

const app = express();
const PORT = process.env.PORT
const uri = process.env.MONGO_URI
const client = new MongoClient(uri)

app.use(express.json())

app.use("/pacientes", )
app.use("/citas", )
app.use("/medicos", )
app.use("/acudientes", )

const conexionDB = async (req, res)=>{
    try {
        await client.connect();
        console.log("¡Haz sido conectado a la base de datos!")
    } catch (error) {
        console.log("Error", error)
    }
}

conexionDB()

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})
