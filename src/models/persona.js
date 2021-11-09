const mongoose = require('mongoose');

const personaSchema = new mongoose.Schema(
    {
        nombre: { type: String, required: true },
        correo: { type: String, required: true },
        direccion: { type: String, required: true },
        numTelefono: { type: String, required: true },
        ciudad: { type: String, required: true },
        estado: { type: String, required: true },
    },
    {
        collection: 'persona',
        versionKey: false,
    }
);

const persona = mongoose.model('persona', personaSchema, 'persona');

module.exports.persona = persona;
