const express = require('express');
const app = express();
const sqlConnection = require('../config/dbConnection');
const bcrypt = require('bcrypt');

const userDB = {}



userDB.findByNickname = (user,funCallback)=>{
    let query = `SELECT * FROM usuarios WHERE nickname = '${user.nickname} ' OR email = '${user.email}';`
    sqlConnection.query(query, (err,result)=>{
        if(err){
            funCallback({
                message: "El usuario y/o email ingresado son incorrectos",
                details: err
            })
        }else{
            funCallback(undefined,result[0])
        }
    })
}

userDB.createUser = (user, funCallback)=>{
    let password = bcrypt.hashSync(user.password,10);
    let query = `INSERT INTO usuarios (email,nickname,password,rol)
    VALUES('${user.email}','${user.nickname}','${password}','${user.rol}')` ;
    sqlConnection.query(query,(err,result)=>{
        if(err){
            funCallback({
                message: "Ha ocurrido un error a la hora de intentar crear el usuario.",
                details: err
            })
        }else{
            funCallback(undefined,{
                    message: `Usuario ${user.nickname} creado con exito`
                })
        }
    })
}



module.exports = userDB;