const express = require('express');
const {DatabaseHandler} = require('./utilities/QueryExecutor.js');

const app = express();
require('dotenv').config();

const port = process.env.NODE_PORT;

const config = require('./config/database.js');
const db = new DatabaseHandler(config);
const {validateRequest} = require('./utilities/DataValidator.js');

const maestrosRoutes = require('./routes/maestros.js');

app.use(express.json());

app.get('/', (req, res)=>{
    res.send('<h1>Hello World</h1>');
});

app.use('/api/maestros', maestrosRoutes);

app.get('/api/estudiantes', async (req, res)=>{
    const result = await db.query('SELECT * FROM estudiantes');
    if(result.success){
        res.json(result.data);
    }
    res.status(500).json({error: result.error});

});

app.post('/api/estudiantes', 
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
            return res.status(201).json({message: 'Estudiante creado'});
        }
        return res.status(500).json({error: result.error});
    }
);


app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
});