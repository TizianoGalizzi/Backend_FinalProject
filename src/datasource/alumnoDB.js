const express = require('express');
const app = express();
const sqlConnection = require('../config/dbConnection');

alumnosDB = {};

//Funcionalidades para alumnos

alumnosDB.getAll = function(funCallback){
    let order = 'ASC';
    sqlConnection.query(`SELECT a.id AS id_alumno, concat_ws(' ',a.nombre, a.apellido) AS alumno, a.dni, c.nombre AS curso FROM alumno_curso AS a_c 
    INNER JOIN alumnos AS a ON a_c.id_alumno = a.id 
    INNER JOIN cursos AS c ON a_c.id_curso = c.id
    ORDER BY a.nombre ${order};`,(err,result)=>{
        if(err){
            funCallback({
                message: "Surgio un problema, contactese con un administrador. Gracias",
                detail: console.log(err)
            })
        }else{
            funCallback(undefined,result);
        }
    });
}

alumnosDB.delete = function(id,funCallback){
    let query = `UPDATE alumnos SET nombre = 'pepito' AND apellido = 'galizzi' WHERE id = ${id}`;
    sqlConnection.query(query, (err,result)=>{
        if(err){
            funCallback({
                message: "Surgio un problema, contactese con un administrador. Gracias",
                detail: console.log(err)
            })
        }else{
            funCallback(undefined,result);
        }
    })
}





module.exports = alumnosDB;