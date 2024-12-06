// Configuración de express
const express = require('express');
const router = express.Router();

// Dependencias necesarias
const { validateRequest } = require('../utilities/DataValidator.js'); // el middleware para las validaciones
const db = require('../db/database.js');

// GET todas las asignaturas
router.get('/', async (req, res) => {
    const result = await db.query('SELECT * FROM materias');
    if (result.success) {
        return res.json(result.data);
    }
    return res.status(500).json({ error: result.error });
});




module.exports = router;