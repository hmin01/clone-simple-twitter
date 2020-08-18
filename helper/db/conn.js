const mysql = require('mysql2/promise');

module.exports = {
    init: () => {
        return mysql.createPool({
            host: 'localhost',
            user: '',
            password: '',
            database: '',
            connectionLimit: 20,
            waitForConnections: true
        });
    },
};