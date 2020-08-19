const mysql = require('mysql2/promise');

module.exports = {
    init: () => {
        return mysql.createPool({
            host: 'localhost',
            user: 'root',
            password: 'jeonghyeon',
            database: 'twitterdb',
            connectionLimit: 20,
            waitForConnections: true
        });
    },
};