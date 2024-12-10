const { DatabaseHandler } = require('../utilities/QueryExecutor.js');
const config = require('../config/database.js');

const db = new DatabaseHandler(config);

module.exports = db;