const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema(
    {
        nombre: { type: String, required: true },
        correo: { type: String, required: true },
        direccion: { type: String, required: true },
        telefono: { type: String, required: true },
        ciudad: { type: String, required: true },
        estado: { type: String, required: true },
        contrasenia: { type: String, required: true },
        sorteos: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Sorteo',
                autopopulate: true,
            },
        ],
    },
    { collection: 'admin', versionKey: false }
);

const admin = mongoose.model('admin', adminSchema, 'admin');    
module.exports = admin;
