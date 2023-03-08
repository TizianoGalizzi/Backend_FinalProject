const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const sqlConnection = require('../config/dbConnection');
const userDB = require("../datasource/userDB")



//Como el token es creado en el login al corroborar que los datos ingresados corresponden a un usuario,
//atendemos con un endpoint especificamente al login en este archivo, donde a su vez crearemos el token.
app.post("/", login);

function login(req, res) {
    userDB.findByNickname(req.body, (err, result) => {
        if (err) {
            res.sendStatus(403).json({
                message: "El nickname y/o email y/o contraseña ingresados son incorrectos.",
                details: err
            })
        } else {
            let { password } = req.body;
            let verifiedPassword = bcrypt.compareSync(password, result.password);
            if (verifiedPassword) {
                const user = {
                    nickname: result.nickname,
                    password: result.password
                }

                jwt.sign(user, 'secretKey', { expiresIn: '30s' }, (err, token) => {
                    if (err) {
                        res.sendStatus(403).send(err)
                    } else {
                        res.header('authorization',token).json({
                            message: "Usuario autentificado",
                            token
                        })
                        
                    }
                })
            } else {
                res.sendStatus(403).json({
                    message: "El nickname y/o email y/o contraseña ingresados son incorrectos."
                })
            }


        }
    })
}
function verifyToken(req, res, next) {
    console.log(req.headers['authorization'])
    if (!req.headers['authorization']) {
        res.status(403).send("No se recibio header autentication");
    } else {
        try {
            const token = req.headers['authorization'];
            const verified = jwt.verify(token, 'secretKey');
            if (verified) {
                next();
            } else {
                res.sendStatus(403).send("Error de autenticacion")
            }
        }
        catch (e) {
            res.send(e);
            console.log(e);
        }
    }
}




module.exports =  {app, verifyToken};