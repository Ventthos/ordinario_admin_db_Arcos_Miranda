const mysql = require('mysql2/promise')

class DatabaseHandler {
    constructor(config) {
        this.pool = mysql.createPool(config);
    }

    async query(sql, params) {
        try{
            const [rows, fields] = await this.pool.execute(sql, params);
            return rows;
        }catch(error){
            console.error('Error executing query:', error);
            throw error;
        }
    }
}

module.exports = {
    DatabaseHandler 
}