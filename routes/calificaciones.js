// Configuración de express
const express = require('express');
const router = express.Router();

// Dependencias necesarias
const { validateRequest } = require('../utilities/DataValidator.js'); // el middleware para las validaciones
const db = require('../db/database.js');

// GET todas las calificaciones (al tenrr mas FK obtengo las relaciones)
router.get('/', async (req, res) => {
    try {
        const query = `
            SELECT 
                calificaciones.id,
                CONCAT(estudiantes.nombre, ' ', estudiantes.apellidos) AS estudiante,
                maestros.nombre AS maestro,
                materias.nombre AS materia,
                calificaciones.create_user,
                calificaciones.create_date
            FROM 
                calificaciones
            INNER JOIN 
                estudiantes ON calificaciones.estudiante_id = estudiantes.id
            INNER JOIN 
                maestros ON calificaciones.maestro_id = maestros.id
            INNER JOIN 
                materias ON calificaciones.materia_id = materias.id
        `;
        const result = await db.query(query);
        if (result.success) {
            return res.json(result.data);
        }
        return res.status(500).json({ error: result.error });
    } catch (error) {
        console.error('Error en el servidor:', error);
        return res.status(500).json({ error: 'Error en el servidor' });
    }

});

// POST para crear calificaciones
router.post('/',
    validateRequest({
        estudiante_id: 'number',
        maestro_id: 'number',
        materia_id: 'number',
        create_user: 'string',
    }),
    async (req, res) => {
        const { estudiante_id, maestro_id, materia_id, create_user } = req.body;
        try {
            const result = await db.query(
                'INSERT INTO calificaciones (estudiante_id, maestro_id, materia_id, create_user, create_date) VALUES (?, ?, ?, ?, NOW())',
                [estudiante_id, maestro_id, materia_id, create_user]
            );
            if (result.success) {
                const createdCalificacion = {
                    id: result.data.insertId,
                    ...req.body,
                };
                return res.status(201).json(createdCalificacion);
            }
            return res.status(500).json({ error: result.error });
        } catch (error) {
            return res.status(500).json({ error: 'Error al insertar la calificación' });
        }
    }
);


module.exports = router;
