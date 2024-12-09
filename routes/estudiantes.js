// Configuración de express
const express = require('express');
const router = express.Router();

// Dependencias necesarias
const {validateRequest} = require('../utilities/DataValidator.js'); //Middleware para checar ausencia y formato de datos
const db = require('../db/database.js'); //Pool de db

//GET todos los estudiantes
router.get('/', async (req, res)=>{
    const result = await db.query('SELECT * FROM estudiantes');
    if(result.success){
        return res.json(result.data);
    }
    return res.status(500).json({error: result.error});

});

// POST todos los estudiantes
router.post('/', 
    validateRequest({
        nombre: 'string',
        apellidos: 'string',
        email: 'string',
        matricula: 'string',
        edad: 'number',
        semestre: 'string',
        usuario_creacion: 'string'
    }),
    async (req, res)=>{
        const {nombre, apellidos, email, matricula, edad, semestre, usuario_creacion} = req.body;
        const result = await db.query(`INSERT INTO estudiantes (nombre, apellidos, email, matricula,
            edad, semestre, usuario_creacion, fecha_creacion) VALUES (?, ?, ?, ?,?,?,?,NOW())`, [nombre, apellidos, email, matricula, edad, semestre, usuario_creacion]);
        if(result.success){
            const createdStudent = {
                id: result.data.insertId,
                ...req.body
            };
            return res.status(201).json(createdStudent);
        }
        return res.status(500).json({error: result.error});
    }
);

module.exports = router;