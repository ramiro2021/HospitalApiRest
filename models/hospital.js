
const { Schema, model } = require('mongoose');


const HospitalSchema = Schema({

    nombre: {
        type: String,
        required: true,
    },
    img: {
        type: String,

    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }
}, { collection: 'Hospitales' });

HospitalSchema.method('toJSON', function () {
    const { _v, ...object } = this.toObject();
    return object;
});

module.exports = model('Hospital', HospitalSchema);