const mysql = require('mysql');

var connection = mysql.createConnection({
    host : 'localhost',
    port : 3000,
    user : 'root',
    password : '010897Dvd.',
    database : 'mydb',
    insureAuth : true
});

connection.connect(error=>{
    if(error) throw error;
    console.log("Base de datos conectada");
});

module.exports = connection; 