// Configuración de express
const express = require('express');
const router = express.Router();

// Dependencias necesarias
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

module.exports = router;
