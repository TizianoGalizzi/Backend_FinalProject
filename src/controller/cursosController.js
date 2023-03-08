const express = require('express');
const app = express();
const cursosDB = require('../datasource/cursoDB');
const security = require('../security/security');

app.get("/" ,  getAll);
app.delete("/:id",security.verifyToken,  eliminateCourse);
app.put("/",security.verifyToken, createCourse)
app.post("/:id",security.verifyToken, modify)
app.put("/inscripcionAlumnos/:id",security.verifyToken, signAlumns)
app.get("/:id",security.verifyToken,  listByID)





function getAll(req,res){
    cursosDB.getAll((err,result)=>{
        if(err){
            res.status(500).send(err);
        }else{
            res.json(result);
        }
    })
}
function eliminateCourse(req,res){
    cursosDB.delete(req.params.id,(err,result)=>{
        if(err){
            res.status(500).send(err);
        }else{
            res.json(result);
        }
    })
}
function createCourse(req,res){
    cursosDB.create(req.body,(err,result)=>{
        if(err){
            res.status(500).send(err);
        }else{
            res.json(result);
        }  
    })
}
function modify(req,res){
    cursosDB.modify(req.body,req.params.id,(err,result)=>{
        if(err){
            res.status(500).send(err);
        }else{
            res.json(result);
        } 
    })
}
function signAlumns(req,res){
    cursosDB.inscAlumn(req.params.id,req.body,(err,result)=>{
        if(err){
            res.status(500).send(err);
        }else{
            res.json(result);
        } 
    })
}
function listByID(req,res){
    cursosDB.listID(req.params.id, (err,result)=>{
        if(err){
            res.status(500).send(err);
        }else{
            res.json(result);
        } 
    })
}
module.exports = app;


