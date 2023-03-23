const express = require('express');
const app = express();
const userDB = require("../datasource/userDB")
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');



//Como el token es creado en el login al corroborar que los datos ingresados corresponden a un usuario,
//atendemos con un endpoint especificamente al login en este archivo, donde a su vez crearemos el token.
app.post("/", login);

function login(req, res) {
    userDB.findByNickname(req.body, (err, result) => {
        if (err) {
                res.status(500).send(err)
        } else if(result.length == 1){
            let { password } = req.body;
            let verifiedPassword = bcrypt.compareSync(password, result[0].password);
            if (verifiedPassword == true || password == result[0].password) {
                const user = {
                    nickname: result[0].nickname,
                    password: result[0].password,
                    rol: result[0].rol
                }
                jwt.sign(user, 'secretKey', { expiresIn: '15d' }, (err, token) => {
                    if (err) {
                        res.status(403).send(err)
                    } else {
                        res.header('authorization',token).json({
                            message: "Usuario autentificado",
                            token
                        })
                        
                    }
                })
            } else {
                res.status(500).json({
                    message:`Usuario y/o contraseña incorrecto`
                })
            }


        }else{
            res.status(304).send(result)
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
                res.status(403).send("Error de autenticacion")
            }
        }
        catch (e) {
            res.send(e);
            console.log(e);
        }
    }
}




module.exports =  {app, verifyToken};