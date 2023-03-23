const express = require('express');
const app = express();
const sqlConnection = require('../config/dbConnection');
const bcrypt = require('bcrypt');

const userDB ={}

// userDB.getDocentesId = (funCallback) =>{
//     sqlConnection.query(`SELECT id FROM usuarios WHERE rol = 'docente' `,(funCallback)=>{
//         if(err){
//             funCallback({
//                 message: `Ha ocurrido un error al intentar obtener la informacion de los id de los docentes.`,
//                 details: err
//             })
//         }else{
//             funCallback(undefined,result.id)
//         }
//     })
// }
// userDB.getAll = (funCallback) =>{
//     sqlConnection.query(`SELECT id,nickname, email, rol FROM usuarios `,(funCallback)=>{
//         if(err){
//             funCallback({
//                 message: `Ha ocurrido un error al intentar obtener la informacion de los usuarios.`,
//                 details: err
//             })
//         }else{
//             funCallback(undefined,result)
//         }
//     })
// }
userDB.findByNickname = (user, funCallback) => {
    let query = `SELECT * FROM usuarios WHERE nickname = '${user.nickname}' ;`
    sqlConnection.query(query, (err, result) => {
        if (err) {
            funCallback({
                message: 'Ha ocurrido un error al intentar encontrar al usuario',
                details: console.log(err)
            })
        } else if (result.length == 1) {
            funCallback(undefined, result)
        } else {
            funCallback(undefined, {
                message: `No se ha encontrado ningún usuario.`,
                result
            })
        }
    })
}
userDB.findByEmail = (user, funCallback) => {
    let query = `SELECT * FROM usuarios WHERE email = '${user.email}' ;`
    sqlConnection.query(query, (err, result) => {
        if (err) {
            funCallback({
                message: 'Ha ocurrido un error al intentar encontrar al usuario',
                details: console.log(err)
            })
        } else if (result.length == 1) {
            funCallback(undefined, result)
        } else {
            funCallback(undefined, {
                message: `No se ha encontrado ningún usuario.`,
                result
            })
        }
    })
}

userDB.createUser = (user, funCallback) => {
    let password = bcrypt.hashSync(user.password, 10);
    let query = `INSERT INTO usuarios (email,nickname,password,rol)
    VALUES('${user.email}','${user.nickname}','${password}','${user.rol}')`;
    sqlConnection.query(query, (err, result) => {
        if (err) {
            if (err.code == 'ER_DUP_ENTRY') {
                funCallback({
                    message: "Ya existe un usuario con ese email/usuario",
                    details: console.log(err)
                })
            } else {
                funCallback({
                    message: "Ha ocurrido un error a la hora de intentar crear el usuario.",
                    details: err
                })
            }
        } else {
            funCallback(undefined, {
                message: `Usuario ${user.nickname} creado con exito`,
                result
            })
        }
    })
}



module.exports = userDB;