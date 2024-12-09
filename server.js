// Configuración de express
const express = require('express');
const app = express();
app.use(express.json());

// Configuración del puerto de node
require('dotenv').config();
const port = process.env.NODE_PORT;

//Configuracion de la url base para las solicitudes
const baseUrl = process.env.BASE_URL; 

// Importación de rutas
const maestrosRoutes = require('./routes/maestros.js');
const estudiantesRoutes = require('./routes/estudiantes.js');
const asignaturasRoutes = require('./routes/asignaturas.js');


//Rutas
app.get('/', (req, res)=>{
    res.send('<h1>Hello World</h1>');
});

app.use('/api/estudiantes', estudiantesRoutes);
app.use('/api/maestros', maestrosRoutes);
app.use('/api/asignaturas', asignaturasRoutes);

app.listen(port, ()=>{
    console.log(`Server is running on ${baseUrl} port ${port} `);
});