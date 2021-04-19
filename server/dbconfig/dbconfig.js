const mysql = require('mysql');

const dbConnection = mysql.createConnection({
    host: 'localhost',
    port: '32000',
    user: 'root',
    password: 'root',
    database: 'citiesData'
});

dbConnection.connect(function(err) {
    if(err) throw err;
});

module.exports = dbConnection;