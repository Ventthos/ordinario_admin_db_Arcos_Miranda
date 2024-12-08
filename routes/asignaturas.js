// Configuración de express
const express = require('express');
const router = express.Router();

// Dependencias necesarias
const { validateRequest } = require('../utilities/DataValidator.js'); // el middleware para las validaciones
const db = require('../db/database.js');

// GET todas las asignaturas
router.get('/', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM materias');
        if (result.success) {
            return res.json(result.data);
        }
        return res.status(500).json({ error: result.error });
    } catch (error) {
        return res.status(500).json({ error: 'Error en el servidor' });
    }
    
});

// POST para crear asignaturas
router.post('/',
    validateRequest({
        nombre: 'string',
        profesor_id: 'number',
        create_user: 'string',
    }),
    async (req, res) => {
        const { nombre, profesor_id, create_user } = req.body;
        try {
            const result = await db.query(
                'INSERT INTO materias (nombre, profesor_id, create_user, create_date) VALUES (?, ?, ?, NOW())',
                [nombre, profesor_id, create_user]
            );
            if (result.success) {
                const createdAsignatura = {
                    id: result.data.insertId,
                    ...req.body,
                };
                return res.status(201).json(createdAsignatura);
            }
            return res.status(500).json({ error: result.error });
        } catch (error) {
            return res.status(500).json({ error: 'Error al insertar la asignatura' });
        }
    }
);


module.exports = router;