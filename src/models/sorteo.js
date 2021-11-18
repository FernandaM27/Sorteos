const mongoose = require('mongoose');

const sorteoSchema = new mongoose.Schema(
    {
        numMin: { type: Number, required: true },
        numMax: { type: Number, required: true },
        precioNumeros: { type: Number, required: true },
        fechaInicioVenta: { type: Date, required: true },
        fechaFinVenta: { type: Date, required: true },
        fechaCreacion: { type: Date, required: true },
        fechaSorteo: { type: Date, required: true },
        diasLimiteApartado: { type: Number, required: true },
        imagen: { type: String, required: false },
        titulo: { type: String, required: true },
        descripcion: { type: String, required: true },
        tiempoRecordatorio: { type: Number, required: true },
        estadoSorteo: { type: String, required: true },
        boletoGanador: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'boletoGanador',
            autopopulate: true,
        },
        boletos: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'boletos',
                autopopulate: true,
            },
        ],
    },
    { collection: 'sorteo', versionKey: false }
);

const sorteo = mongoose.model('sorteo', sorteoSchema, 'sorteo');
module.exports = sorteo;
