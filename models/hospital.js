const { Schema, model } = require('mongoose');

const HospitalSchema = Schema({
    
    nombre: {
        type: String,
        /* Para que sea obligatorio ponemnos lo siguiente */
        require: true,
    },
    img: {
        type: String,
    },
    usuario: {
        require: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }
}, { collection: 'hospitales'});

HospitalSchema.method('toJSON', function() {
    const{ __v, ...object} = this.toObject();
    return object;
})

module.exports = model( 'Hospital', HospitalSchema );