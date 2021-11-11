const mongoose = require('mongoose');

const boletoSchema = new mongoose.Schema(
    {
        numero: { type: Number, required: true },
        comprobantePago: { type: String },
        tipoPago: { type: String },
        estado: { type: String, required: true },
        nombreParticipante: { type: String, required: true },
        movimientoBoleto: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'movimientoBoleto',
                autopopulate: true,
            },
        ],
        persona: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Sorteo',
            autopopulate: true,
        },
        cliente :{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Cliente',
            autopopulate: true,
        }
    },
    { collection: 'boleto', versionKey: false }
);

const boleto = mongoose.model('boleto', boletoSchema, 'boleto');
module.exports = boleto;
