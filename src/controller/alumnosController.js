const express = require('express');
const app = express();
const alumnosDB = require('../datasource/alumnoDB');
const security = require('../security/security');

app.get("/" , getAll);
app.get("/:id",security.verifyToken,getByID)
app.delete("/:id",security.verifyToken, eliminar);
app.put("/",security.verifyToken, createAlumn)
app.post("/:id",security.verifyToken, modify)





function getAll(req,res){
    alumnosDB.getAll((err,result)=>{
        if(err){
            res.status(500).send(err);
        }else{
            res.json(result);
        }
    })
}
function getByID(req,res){
    alumnosDB.getById(req.params.id,(err,result)=>{
        if(err){
            res.status(500).send(err);
        }else{
            res.json(result);
        }
    })
}
function eliminar(req,res){
    alumnosDB.delete(req.params.id,(err,result)=>{
        if(err){
            res.status(500).send(err);
        }else{
            res.json(result);
        }
    })
}
function createAlumn(req,res){
    alumnosDB.create(req.body,(err,result)=>{
        if(err){
            res.status(500).send(err);
        }else{
            res.json(result);
        }  
    })
}
function modify(req,res){
    alumnosDB.modify(req.body,req.params.id,(err,result)=>{
        if(err){
            res.status(500).send(err);
        }else{
            res.json(result);
        } 
    })
}
module.exports = app;


