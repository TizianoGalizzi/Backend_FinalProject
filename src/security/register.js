const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const sqlConnection = require('../config/dbConnection');
const userDB = require("../datasource/userDB")


app.put("/", register);



function register(req,res){
    userDB.createUser(req.body,(err,result)=>{
        if(err){
            res.status(500).send(err);
        }else{
            res.json(result);
        }
    })

}

module.exports = app;