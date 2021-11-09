const mongoose = require('mongoose');

const sorteoSchema = new mongoose.Schema({
    rangoNumeros: { type: Number, required: true },
    precioNumeros: { type: Number, required: true },
    fechaInicioVenta: { type: Date, required: true },
    fechaFinVenta: { type: Date, required: true },
    fechaSorteo: { type: Date, required: true },
    diasLimiteApartado: { type: Number, required: true },
    imagen: { type: String, required: false },
    titulo: { type: String, required: true },
    descripcion: { type: String, required: true },
    estado: { type: String, required: true },
    tiempoRecordatorio: { type: Number, required: true },
    BoletoGanador: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'boleto',
        autopopulate: true,
    },
    Boletos: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'boleto',
            autopopulate: true,
        },
    ],
});

const sorteo = mongoose.model('sorteo', sorteoSchema, 'sorteo');
module.exports = sorteo;
