const express = require('express');
const res = require('express/lib/response');
const {DatabaseHandler} = require('./utilities/QueryExecutor.js');

const app = express();
require('dotenv').config();

const port = process.env.NODE_PORT;

const config = require('./config/database.js');
const db = new DatabaseHandler(config);

app.use(express.json());

app.get('/', (req, res)=>{
    res.send('<h1>Hello World</h1>');
});

app.get('/api/estudiantes', async (req, res)=>{
    const estudiantes = await db.query('SELECT * FROM estudiantes');
    res.json(estudiantes);
});

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
});