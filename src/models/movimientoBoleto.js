const mongoose = require('mongoose');

const movimientoBoletoSchema = new mongoose.Schema({
    fecha:{type: Date, required: true},
    descripcion:{type:String, required:true},
    estado: {type:String, required:true}
});

const movimientoBoleto = mongoose.model('movimientoBoleto', movimientoBoletoSchema, 'movimientoBoleto');

module.exports.movimientoBoleto = movimientoBoleto;