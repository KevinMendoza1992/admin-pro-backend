const { response } = require('express');
const bcrypt = require('bcryptjs') // para instalar: npm i bcryptjs

const Hospital = require('../models/hospital');
const { generarJWT } = require('../helpers/jwt');


/*
    //request(req): es lo que se solicita(informacion de los headers, que cliente fue, etc)
    //respone(res): es lo que nosostros o nuestro servidor va a respoderle al cliente lo que acaba de solicitar en nuestro backend
*/

const getHospitales =async (req, res = response) => {

    const hospitales = await Hospital.find()
                                    .populate('usuario', 'nombre email img'); /*El populate usamos para que nos muestre mas campos del usuario en este caso */

    res.json({
        ok: true,
        hospitales
    });
}

const crearHospital = async (req, res = response) => {

    /*  se necesita el id del ususario que esta grabando, y este id se lo tiene en el 
        request, esto es asi por que ya se paso por el middleware de autenticacion verificacion
        del JWT */
    const __id = req.__id;
        
    const hospital = new Hospital( {
        usuario: __id,
        ...req.body
    });

    try {

        const hospitalDB = await hospital.save();

        res.json({
            ok: true,
            hospital: hospitalDB
        }); 

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Hable con el administrador"
        });
        
    }
    

}

const actualizarHospital = async (req, res = response) => {

        
}

const borrarHospital = async (req, res = response) => {
    
   
} 

module.exports = {
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital
}