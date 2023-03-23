// const express = require('express');
// const app = express();
// const userDB = require("../datasource/userDB");
// const security = require('../security/security');
// const sqlConnection = require('../config/dbConnection');



// app.get('/setRol',security.verifyToken , getAllUsers );
// app.post('/setRol',security.verifyToken, getDocentesId )



// function getDocentesId(req,res){
//     userDB.getDocentesId((err,result)=>{
//         if(err){
//             res.status(500).send(err)
//         }else{
//             res.json(result)
//         }
//     })
// }
// function getAllUsers(req,res){
//     userDB.getAll((err,result)=>{
//         if(err){
//             res.status(500).send(err)
//         }else{
//             res.json(result);
//         }
//     })
// }
// module.exports = app