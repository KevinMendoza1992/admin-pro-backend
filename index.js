//importaciones en node
const express = require('express');
// Variables de entorno del archivo .env
require('dotenv').config();
// Configuracion del cors
const cors = require('cors');


const { dbConnetion } = require('./database/config');

//Crear el servidor de express
const app = express();

// Configurar cors
app.use(cors());


//base de datos
dbConnetion();

//Visualizar todas las variables de entorno que estan corriendo: console.log(process.env);

//Rutas
//request(req): es lo que se solicita(informacion de los headers, que cliente fue, etc)
//respone(res): es lo que nosostros o nuestro servidor va a respoderle al cliente lo que acaba de solicitar en nuestro backend
app.get('/', (req, res) => {
    res.json({
        ok: true,
        msh:'Hola mundo'
    })
});

/*  MongoDB
    Usuario: mean_user
    Pass: Rb9KeUTvU6dpnOoE
*/
//Levantar el servidor
app.listen( process.env.PORT, ()=> {
    console.log('Servidor corriendo en el puerto '+process.env.PORT);
});


/*
    instalaciones: 
        nodemon
        npm i mongoose  : para la base de datos
        npm i dotenv    : para las variables de entorno
        npm i cors      : para pedir o para hacer las configuraciones en el servidor
                          para que acepte peticiones de diferentes dominios(ejeplo peticion alguna api).
*/