const nodemon = require('nodemon');
const morgan = require('morgan');
const express = require('express');
const app = express();
const cors = require('cors')
const config = require('./src/config/config.json');

app.use(cors()) 
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(morgan('tiny'))



/*Route listener*/
const alumnosController = require('./src/controller/alumnosController') 
app.use("/alumnos",alumnosController);
const cursosController = require('./src/controller/cursosController');
app.use("/cursos", cursosController);
const register = require('./src/security/register')
app.use("/register", register)
const security = require('./src/security/security');
app.use("/login",security.app);


// const cursosController = require('./src/controller/cursosController')
// app.use("/cursos",cursosController);


app.listen(config.server.port, (err)=>{
    if(err){
        console.log(err)
    }else{
        console.log(`Conexion exitosa al puerto ${config.server.port}`);
    }
})