const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const sqlConnection = require('../config/dbConnection');
const userDB = require("../datasource/userDB")


app.put("/", register);




function register(req, res) {
    userDB.findByNickname(req.body, (err, result) => {
        if (err) {
            res.status(500).send(err)
        } else if (result.result.length == 0) {
            userDB.findByEmail(req.body, (err, result) => {
                if (err) {
                    res.status(500).send(err)
                } else if (result.result.length == 0) {
                    userDB.createUser(req.body, (err, result) => {
                        if (err) {
                            res.status(500).send(err);
                        } else {
                            res.json(result);
                        }
                    })
                } else {
                    res.status(400).json({
                        message: `Ya existe un usuario con el email: ${req.body.email}`
                    })
                }
            })
        } else {
            res.status(400).json({
                message: `Ya existe un usuario con el nickname: ${req.body.nickname}`
            })
        }
    })


}
// function searchByUsername (req,res){
//     userDB.findByNickname(req.body,(err,result)=>{
//         if(err){
//             res.status(500).send(err)
//         }else{
//             res.json(result)
//         }
//     })
// }
// function searchByEmail (req,res){
//     userDB.findByEmail(req.body,(err,result)=>{
//         if(err){
//             res.status(500).send(err)
//         }else{
//             res.json(result)
//         }
//     })
// }

module.exports = app;