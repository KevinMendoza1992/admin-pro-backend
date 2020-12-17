const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    
    nombre: {
        type: String,
        /* Para que sea obligatorio ponemnos lo siguiente */
        require: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
    },
    img: {
        type: String,
    },
    role: {
        type: String,
        require: true,
        default: 'USER_ROLE',
    },
    google: {
        type: Boolean,
        default: false,
    },

});

UsuarioSchema.method('toJSON', function() {
    const{ __v, password, ...object} = this.toObject();
    return object;
})

module.exports = model( 'Usuario', UsuarioSchema );