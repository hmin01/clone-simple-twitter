const mysql = require("mysql");

const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'jiwon',
    database : 'twitterdb'
});

module.exports = connection;