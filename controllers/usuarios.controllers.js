const { response } = require('express');
const bcrypt = require('bcryptjs') // para instalar: npm i bcryptjs

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');


/*
    //request(req): es lo que se solicita(informacion de los headers, que cliente fue, etc)
    //respone(res): es lo que nosostros o nuestro servidor va a respoderle al cliente lo que acaba de solicitar en nuestro backend
*/

const getUsuarios =async (req, res) => {

    const usuarios = await Usuario.find({}, 'nombre email role google');

    res.json({
        ok: true,
        usuarios
    });
}

const crearUsuario = async (req, res = response) => {

    const { email, password } = req.body;

   

    try{

        // Validacion para correo unico

        const existeEmail = await Usuario.findOne({email})

        if( existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya esta registrado'
            });
        }

        const usuario = new Usuario( req.body );

        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt)

        // Guardar usuario
        await usuario.save();

        // Generar el TOKEN - JWT
        const token = await generarJWT( usuario.id);
    
        res.json({
            ok: true,
            usuario,
            token
        });

    } catch(error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado. revisar logs'
        });
    }
}

const actualizarUsuario = async (req, res = response) => {

    const __id = req.params.id;

    try{

        const usuarioDB = await Usuario.findById(__id);

        if(!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'El usuario con ese id no existe'
            }); 
        }

        // Actualizacion
        const { password, google, email, ...campos} = req.body;

        if( usuarioDB.email !== email) {
            const existeEmail = await Usuario.findOne({email});
            if(existeEmail) {
                return res.status(400).json({
                    ok: false,
                    msg: 'ya existe usuario con ese correo'
                });
            }
        }

        campos.email = email;

        /* para poder reemplazar las siguientes lineas
        delete campos.password;
        delete campos.google;
        se puede poner { password, google, ...campos} en la actualizacion
        */
        const usuarioActualizado = await Usuario.findByIdAndUpdate( __id, campos, {new: true});

        res.json({
            ok: true,
            usuario: usuarioActualizado
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });
    }
}

const borrarUsuario = async (req, res = response) => {
    
    const __id = req.params.id;

    try{
        const usuarioDB = await Usuario.findById(__id);

        if(!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'El usuario con ese id no existe'
            }); 
        }

        await Usuario.findOneAndDelete(__id);

        res.status(200).json({
            ok: true,
            msg: 'usuario borrado',
            __id
        });

    } catch(error) {
        res.status(400).json({
            ok: false,
            msg: 'Error al borrar'
        });
    }
} 

module.exports = {
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    borrarUsuario
}