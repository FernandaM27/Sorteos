const boleto = require('../models/boleto');

const crearBoletos = (numMin, numMax) => {
    const boletos = [];
    for (let i = numMin; i <= numMax; i++) {
        const bol = new boleto({
            numero: i,
            comprobantePago: '',
            tipoPago: '',
            estadoBoleto: 'LIBRE',
        });
        bol.save((err) => {
            if (err) {
                throw new Error(err.message);
            } 
        });
        boletos.push(bol);
    }
    return boletos;
};

const getBoletos = (req, res) => {
    boleto.find((err, boletos) => {
        if (err) {
            res.status(400).json({
                status: 'error',
                message: `Error al obtener los boletos: ${err}`,
            });
        } else {
            res.status(200).json({
                status: 'success',
                data: boletos,
            });
        }
    });
};

const getBoleto = (req, res) => {
    boleto.findById(req.params.id, (err, boleto) => {
        if (err) {
            res.status(400).json({
                status: 'error',
                message: `Error al obtener el boleto: ${err}`,
            });
        } else {
            res.status(200).json({
                status: 'success',
                data: boleto,
            });
        }
    });
};

const eliminarBoleto = (req, res) => {
    boleto.findByIdAndDelete({ _id: req.params.id }, (err, boleto) => {
        if (err) {
            res.status(400).json({
                status: 'error',
                message: `Error al eliminar el boleto: ${err}`,
            });
        } else {
            res.status(200).json({
                status: 'success',
                data: boleto,
            });
        }
    });
};

const actualizarBoleto = (req, res) => {
    boleto.findByIdAndUpdate(req.params.id, req.body, (err, boleto) => {
        if (err) {
            res.status(400).json({
                status: 'error',
                message: `Error al actualizar el boleto: ${err}`,
            });
        } else {
            res.status(200).json({
                status: 'success',
                data: boleto,
            });
        }
    });
};

module.exports = {
    crearBoletos,
    getBoletos,
    getBoleto,
    eliminarBoleto,
    actualizarBoleto,
};
