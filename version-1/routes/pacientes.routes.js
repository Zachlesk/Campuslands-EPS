import express from "express";
import { ordenAlfabetico } from '../controllers/pacientes.controller.js'
const router = express.Router();

router.get("/alfabetico", async(req, res)=>{
    try {
        const pacientes = await ordenAlfabetico();
        console.log(pacientes)
    } catch (error) {
        console.log("Error:", error)
    }
})