const mysql = require('mysql2');
const config = require('./config.json');

var sqlConnection = mysql.createConnection(config.database);

sqlConnection.connect((err)=>{
    if(err){
        console.log("Ha ocurrido un error en la conexion con la base de datos");
    }else{
        console.log("Conexion exitosa a DB");
    }
})

module.exports = sqlConnection;