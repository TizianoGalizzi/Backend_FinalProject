const express = require('express');
const app = express();
const sqlConnection = require('../config/dbConnection');

cursosDB = {};


cursosDB.getAll = function (funCallback) {
    sqlConnection.query(`SELECT * FROM cursos AS c 
    ORDER BY c.id ASC;`, (err, result) => {
        if (err) {
            funCallback({
                message: "Surgio un problema, contactese con un administrador. Gracias",
                detail: console.log(err)
            })
        } else {
            funCallback(undefined, result);
        }
    });
}

cursosDB.delete = function (id, funCallback) {
    let query = `DELETE FROM alumno_curso WHERE id_curso = ${id} `;
    sqlConnection.query(query, (err) => {
        if (err) {
            funCallback({
                message: "Surgio un problema, contactese con un administrador. Gracias",
                detail: console.log(err)
            })
        } else {
            sqlConnection.query(`DELETE FROM cursos WHERE id = ${id}`, (err) => {
                if (err) {
                    funCallback({
                        message: "Surgio un problema, contactese con un administrador. Gracias",
                        detail: console.log(err)
                    })
                } else {
                    funCallback(undefined, {
                        message: `Se ha eliminado con exito el curso con id ${id}`
                    });
                }
            });

        }
    })



}

cursosDB.create = function (curso, funCallback) {
    let query = `INSERT INTO cursos (nombre,descripcion,imagen,año,activo)VALUES('${curso.nombre}','${curso.descripcion}','${curso.imagen}',${curso.año},${curso.activo});`;
    sqlConnection.query(query, (err, result) => {
        if (err) {
            funCallback({
                message: "Surgio un problema, contactese con un administrador. Gracias",
                detail: console.log(err)
            })
        } else {
            funCallback(undefined, {
                message: `Se ha creado con exito el curso ${curso.nombre}${curso.año} `
            });
        }
    })
}
cursosDB.modify = function (curso, id, funCallback) {
    let query = `UPDATE cursos SET nombre = '${curso.nombre}', descripcion = '${curso.descripcion}', imagen = '${curso.imagen}',año = ${curso.año},activo = ${curso.activo} WHERE id = ${id}; `
    sqlConnection.query(query, (err, result) => {
        if (err) {
            funCallback({
                message: "Surgio un problema, contactese con un administrador. Gracias",
                detail: console.log(err)
            })
        } else {
            funCallback(undefined, {
                message: `Se ha modificado con exito el curso de id ${id}`
            });
        }
    })
}
cursosDB.listID = function (id, funCallback) {
    sqlConnection.query(`SELECT a.id, a.nombre, a.apellido, a.dni,a.id_usuario, c.nombre as curso FROM alumno_curso as a_c 
    INNER JOIN alumnos as a ON a_c.id_alumno = a.id
    INNER JOIN cursos as c ON a_c.id_curso = c.id  
    WHERE c.id = ${id}`, (err, result) => {
        if (err) {
            funCallback({
                message: "Surgio un problema, contactese con un administrador. Gracias",
                detail: console.log(err)
            })
        } else {
            funCallback(undefined, {
                message: `Mostrando alumnos del curso ID = ${id}`,
                details: result
            });
        }
    })
}
cursosDB.inscAlumn = function (lista, id, funCallback) {
    for (let i = 0; i < lista.data.length; i++) {
            sqlConnection.query(`INSERT INTO alumno_curso (id_alumno,id_curso)VALUES
            (${lista.data[i]},${id});`, (err, result) => {
                if (err) {
                    funCallback({
                        message: "Surgio un problema, contactese con un administrador. Gracias",
                        detail: console.log(err)
                    })
                } else {
                    if (i == lista.data.length) {
                        funCallback(undefined, {
                            message: `Se han inscripto con exito los alumnos en el curso de ID = ${id}`,
                            result
                        });
                    }
                }
            })
    }
}
cursosDB.dropAlumn = function (lista, id, funCallback) {
    for (let i = 0; i < lista.data.length; i++) {
        sqlConnection.query(`DELETE FROM alumno_curso WHERE id_alumno = ${lista.data[i]} AND id_curso = ${id};`, (err, result) => {
            if (err) {
                funCallback({
                    message: "Surgio un problema, contactese con un administrador. Gracias",
                    detail: console.log(err)
                })
            }
            if(i == lista.data.length){
                funCallback(undefined, {
                    message: `Se han eliminado con exito los alumnos del curso ID = ${id}`,
                    result
                });
            }
        })
    }
}





module.exports = cursosDB;