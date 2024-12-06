// Configuración de express
const express = require('express');
const router = express.Router();

// Dependencias necesarias
const {validateRequest} = require('../utilities/DataValidator.js');
const db = require('../db/database.js');

// GET todos los maestros
router.get('/', async (req, res)=>{
    const result = await db.query('SELECT * FROM maestros');
    if(result.success){
        res.json(result.data);
    }
    res.status(500).json({error: result.error});
});

// POST maestros
router.post('/',
    validateRequest({
        nombre: 'string',
        edad: 'number',
        telefono: 'string',
        correo: 'string',
        usuario_creacion: 'string'
    }),
    async (req, res)=>{
        const {nombre, edad, telefono, correo, usuario_creacion} = req.body;
        const result = await db.query(`INSERT INTO maestros (nombre, edad, telefono, correo, usuario_creacion, fecha_creacion) 
            VALUES (?, ?, ?, ?, ?, NOW())`, [nombre, edad, telefono, correo, usuario_creacion]);
        if(result.success){
            return res.status(201).json({message: 'Maestro creado'});
        }
        return res.status(500).json({error: result.error});
    }
); 

module.exports = router;