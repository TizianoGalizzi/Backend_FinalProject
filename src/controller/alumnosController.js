const express = require('express');
const app = express();
const alumnosDB = require('../datasource/alumnoDB');

app.get("/" , getAll);
app.post("/:id", eliminar);


function getAll(req,res){
    alumnosDB.getAll((err,result)=>{
        if(err){
            res.status(500).send(err);
        }else{
            res.json(result);
        }
    })
}
function eliminar(req,res){
    alumnosDB.delete(req.params,(err,result)=>{
        if(err){
            res.status(500).send(err);
        }else{
            res.json(result);
        }
    })
}

module.exports = app;


