const { response } = require('express');
const bcrypt = require('bcryptjs') 

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');

const login = async( req, res = response) => {

    const{ email, password} = req.body;
    try {

        const usuarioDB = await Usuario.findOne({email});

        // Verificar email
        if( !usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'email no valido'
            });
        }

        // Verificar password
        const validPassword = bcrypt.compareSync( password, usuarioDB.password);
        if( !validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Password no valido'
            });
        }

        // Generar el TOKEN - JWT
        const token = await generarJWT( usuarioDB.id);
        

        res.json( {
            ok: true,
            token
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}

const googleSignIn = async ( req, res = response) => {

    const googletoken = req.body.token;

    
    try {

        const { name, email, picture} = await googleVerify(googletoken);

        const usuarioDB = await Usuario.findOne({email});
        let usuario;

        if( !usuarioDB ) {
            // si no existe
            usuario = new Usuario({
               nombre: name,
               email,
               password: '@@@',
               img: picture,
               google: true 
            });
        }else {
            // existe usuario
            usuario = usuarioDB;
            usuario.google = true;
        }

        //Guardar en BD
        await usuario.save();

        // Generar el TOKEN - JWT
        const token = await generarJWT( usuario.id);
        

        res.json({
            ok: true,
            token
        });
        
    } catch (error) {
        res.status(401).json({
            ok: false,
            msg: 'Token no valido'
        });
    }
}

const renewToken = async ( req, res=response) => {

    const __id =  req.__id;

    // Generar el TOKEN - JWT
    const token = await generarJWT( __id);

    res.json({
        ok: true,
        token
    });
}

module.exports = {
    login,
    googleSignIn,
    renewToken
}