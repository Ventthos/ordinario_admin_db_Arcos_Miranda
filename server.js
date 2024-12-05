const express = require('express');
const res = require('express/lib/response');
const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res)=>{
    res.send('<h1>Hello World</h1>');
});

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
});