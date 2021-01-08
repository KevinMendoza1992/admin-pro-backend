const { response } = require('express');
const bcrypt = require('bcryptjs') // para instalar: npm i bcryptjs

const Medico = require('../models/medico');
const { generarJWT } = require('../helpers/jwt');


/*
    //request(req): es lo que se solicita(informacion de los headers, que cliente fue, etc)
    //respone(res): es lo que nosostros o nuestro servidor va a respoderle al cliente lo que acaba de solicitar en nuestro backend
*/

const getMedicos =async (req, res = response) => {

    const medicos = await Medico.find()
                            .populate('usuario', 'nombre img')
                            .populate('hospital', 'nombre img');

    res.json({
        ok: true,
        medicos
    });
}

const crearMedico = async (req, res = response) => {

    /*  se necesita el id del ususario que esta grabando, y este id se lo tiene en el 
        request, esto es asi por que ya se paso por el middleware de autenticacion verificacion
        del JWT */
        const __id = req.__id;
        
        const medico = new Medico( {
            usuario: __id,
            ...req.body
        });
    
        try {
    
            const medicoDB = await medico.save();
    
            res.json({
                ok: true,
                medico: medicoDB
            }); 
    
        } catch (error) {
            console.log(error);
            res.status(500).json({
                ok: false,
                msg: "Hable con el administrador"
            });            
        }
}

const actualizarMedico = async (req, res = response) => {

        
}

const borrarMedico = async (req, res = response) => {
    
   
} 

module.exports = {
    getMedicos, 
    crearMedico, 
    actualizarMedico, 
    borrarMedico
}