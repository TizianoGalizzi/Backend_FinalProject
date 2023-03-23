const express = require('express');
const app = express();
const sqlConnection = require('../config/dbConnection');

alumnosDB = {};

alumnosDB.getAll = function(funCallback){
    let order = 'ASC';
    sqlConnection.query(`SELECT a.id, a.nombre, a.apellido, a.dni, a.id_usuario FROM alumnos AS a 
    ORDER BY a.id ${order};`,(err,result)=>{
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
alumnosDB.getById = function(id, funCallback){
    sqlConnection.query(`SELECT a.id, a.nombre, a.apellido, a.dni, a.id_usuario FROM alumnos AS a 
    ORDER BY a.id ASC WHERE a.id = ${id};`,(err,result)=>{
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
    let query = `DELETE FROM alumnos WHERE id = ${id}`;
    sqlConnection.query(query, (err,result)=>{
        if(err){
            funCallback({
                message: "Surgio un problema, contactese con un administrador. Gracias",
                detail: console.log(err)
            })
        }else{
            funCallback(undefined,{
                message: `Se ha eliminado con exito el alumno id = ${id}`,
                result
            });
        }
    })
}
alumnosDB.create = function(alumno,funCallback){
    let query = `INSERT INTO alumnos (nombre,apellido,dni,id_usuario)VALUES('${alumno.nombre}','${alumno.apellido}','${alumno.dni}','${alumno.id_usuario}');`;
    sqlConnection.query(query,(err,result)=>{
        if(err){
            if(err.code === 'ER_DUP_ENTRY'){
                funCallback({
                    message: `Ya existe un usuario con el dni ${alumno.dni}`,
                    details: console.log(err)
                })
            }else{
                funCallback({
                    message: "Surgio un problema, contactese con un administrador. Gracias",
                    detail: console.log(err)
                })
            }
        }else{
            funCallback(undefined,{
                message: `Se ha creado con exito el alumno ${alumno.nombre }${alumno.apellido} `,
                result
            });
        }
    })
}
alumnosDB.modify = function(alumno,id,funCallback){
    let query = `UPDATE alumnos SET nombre = '${alumno.nombre}' , apellido = '${alumno.apellido}',dni = '${alumno.dni}',id_usuario = ${alumno.id_usuario} WHERE id = ${id}; `
    sqlConnection.query(query, (err,result)=>{
        if(err){
            if(err.code === 'ER_DUP_ENTRY'){
                funCallback({
                    message: `Ya existe un usuario con el dni ${alumno.dni}`,
                    details: console.log(err)
                })
            }else{
                funCallback({
                    message: "Surgio un problema, contactese con un administrador. Gracias",
                    detail: console.log(err)
                })
            }
        }else{
            funCallback(undefined,{
                message: `Se ha modificado con exito el alumno de id ${id}`,
                result
            });
        }
    })
}




module.exports = alumnosDB;