require('dotenv').config();
const mysql = require('mysql2/promise');

(async () => {
    try {
        const connection = await mysql.createConnection({
            host: process.env.HOST,
            user: process.env.USER,
            password: process.env.PASSWORD,
            database: process.env.DATABASE,
            port: process.env.MYSQL_PORT,
        });

        console.log('Conexión exitosa a la base de datos');
        await connection.end();
    } catch (error) {
        console.error('Error de conexión:', error);
    }
})();
