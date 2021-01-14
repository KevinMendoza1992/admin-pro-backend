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

// Middleware: LEctura y parsep del body
app.use( express.json());


//base de datos
dbConnetion();

//Directorio public
app.use(express.static('public'));

//Visualizar todas las variables de entorno que estan corriendo: console.log(process.env);

//Rutas
app.use( '/api/usuarios', require('./routes/usuarios'));
app.use( '/api/hospitales', require('./routes/hospitales'));
app.use( '/api/medicos', require('./routes/medicos'));
app.use( '/api/todo/', require('./routes/busquedas'));
app.use( '/api/login', require('./routes/auth'));
app.use( '/api/upload', require('./routes/uploads'));

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