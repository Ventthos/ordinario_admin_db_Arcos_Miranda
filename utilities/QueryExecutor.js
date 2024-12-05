const mysql = require('mysql2/promise')

class DatabaseHandler {
    constructor(config) {
        this.pool = mysql.createPool(config);
    }

    async query(sql, params) {
        try {
            const [rows, fields] = await this.pool.execute(sql, params);
            return {
                success: true,
                data: rows
            };
        } catch (error) {
            console.error('Error executing query:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }
}

module.exports = {
    DatabaseHandler 
}