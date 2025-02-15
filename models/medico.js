
const { Schema, model } = require('mongoose');


const MedicoSchema = Schema({

    nombre: {
        type: String,
        required: true,
    },
    img: {
        type: String,

    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true,
    },
    hospital: {
        type: Schema.Types.ObjectId,
        ref: 'Hospital',
        required: true,
    }
}, { collection: 'Medicos' });

MedicoSchema.method('toJSON', function () {
    const { _v, ...object } = this.toObject();
    return object;
});

module.exports = model('Medico', MedicoSchema);