const { Schema, model } = require('mongoose');

const medicoSchema = Schema({
    
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
        ref: 'Usuario',
    },
    hospital: {
        require: true,
        type: Schema.Types.ObjectId,
        ref: 'Hospital',
    }
}, { collection: 'medicos'});

medicoSchema.method('toJSON', function() {
    const{ __v, ...object} = this.toObject();
    return object;
})

module.exports = model( 'Medico', medicoSchema );