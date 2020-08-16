var mysql = require('mysql');

//연결 생성
let connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'jeonghyeon',
    database : 'twitterdb'
});

module.exports = connection;