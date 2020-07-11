const mysql = require('mysql');

var connection = mysql.createConnection({

    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '84075358Mf.',
    database: 'mydb',
    insureAuth: true

connection.connect(error => {
    if (error) throw error;
    console.log("Base de datos conectada");
});


module.exports = connection;
