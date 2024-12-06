// Configuración de express
const express = require('express');
const app = express();
app.use(express.json());

// Configuración del puerto de node
require('dotenv').config();
const port = process.env.NODE_PORT;

// Importación de rutas
const maestrosRoutes = require('./routes/maestros.js');
const estudiantesRoutes = require('./routes/estudiantes.js');

//Rutas
app.get('/', (req, res)=>{
    res.send('<h1>Hello World</h1>');
});

app.use('/api/estudiantes', estudiantesRoutes);
app.use('/api/maestros', maestrosRoutes);

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
});