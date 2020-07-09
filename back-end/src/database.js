const mysql = require('mysql');

var connection = mysql.createConnection({
    host : 'localhost',
    port : 3307,
    user : 'root',
    password : '',
    database : 'mydb',
    insureAuth : true
});

connection.connect(error=>{
    if(error) throw error;
    console.log("Base de datos conectada");
});

module.exports = connection; 