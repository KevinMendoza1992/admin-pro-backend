const fs = require('fs'); /* el file sistem o fs nos permite leer las carpetas y los archivos */

const Usuario = require('../models/usuario');
const Hospital = require('../models/hospital');
const Medico = require('../models/medico');

const borraImagen = (path) => {
    
    if (fs.existsSync(path)) {
        //borrar la imagen anterior
        fs.unlinkSync(path);
    }
}

const actualizarImagen = async( tipo, id, nombreArchivo ) => {

    let pathViejo = '';
    switch (tipo) {
        case 'medicos':
            const medico = await Medico.findById(id);
            if (!medico) {
                console.log('No es un medico por id');
                return false;
            }

            pathViejo = `./uploads/medicos/${medico.img}`;
            borraImagen( pathViejo );

            medico.img = nombreArchivo;
            await medico.save();
            return true;
        break;

        case 'hospitales':
            const hospital = await Hospital.findById(id);
            if (!hospital) {
                console.log('No es un hospital por id');
                return false;
            }

            pathViejo = `./uploads/hospitales/${hospital.img}`;
            borraImagen( pathViejo );

            hospital.img = nombreArchivo;
            await hospital.save();
            return true;
            
        break;
        case 'usuarios':
            const usuario = await Usuario.findById(id);
            if (!usuario) {
                console.log('No es un usuario por id');
                return false;
            }

            pathViejo = `./uploads/usuarios/${usuario.img}`;
            borraImagen( pathViejo );

            usuario.img = nombreArchivo;
            await usuario.save();
            return true;
        break;
    
        default:
            break;
    }
    
}

module.exports = {
    actualizarImagen
}