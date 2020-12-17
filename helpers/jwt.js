/*
    instalacion: npm i jsonwebtoken
*/

const jwt = require('jsonwebtoken');

const generarJWT = ( __id ) => {

    return new Promise(( resolve, reject ) => {

        const payload = {
            __id
        };
        /* JWT_SECRET es la secret o private key, esta se encuentra en las variables de entorno (.env) */
        jwt.sign( payload, process.env.JWT_SECRET, {
            expiresIn: '12h'
        }, ( err, token ) => {
    
            if( err ) {
                console.log(err);
                reject('No se pudo generar l JWT');
            } else{
                resolve(token);
            }
        });

    });
}

module.exports = {
    generarJWT
}
