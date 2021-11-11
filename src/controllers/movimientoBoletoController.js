const { movimientoBoleto } = require('../models/movimientoBoleto');

const guardarMovimientoBoleto = (request, response) => {
    const movB = new movimientoBoleto(req.body);
    movB.save((err) => {
        if (err) {
            response.status(400).json({
                status: 'error',
                error: err,
            });
        } else
            response.status(201).json({
                status: 'success',
                movB,
            });
    });
};

const getMovimientosBoletos = (req, res) => {
    movimientoBoleto.find((err, movimientoBoleto) => {
        if (err) {
            res.status(400).json({
                status: 'error',
                message: `Error al obtener los movimientos: ${err}`,
            });
        } else {
            res.status(200).json({
                status: 'success',
                data: movimientoBoleto,
            });
        }
    });
};

const getMovimientoBoleto = (req, res) => {
    movimientoBoleto.findById(req.params.id, (err, movimientoBoleto) => {
        if (err) {
            res.status(400).json({
                status: 'error',
                message: `Error al obtener a el movimiento: ${err}`,
            });
        } else {
            res.status(200).json({
                status: 'success',
                data: movimientoBoleto,
            });
        }
    });
};

const eliminarMovimientoBoleto = (req, res) => {
    movimientoBoleto.findByIdAndDelete(
        { _id: req.params.id },
        (err, movimientoBoleto) => {
            if (err) {
                res.status(400).json({
                    status: 'error',
                    message: `Error al eliminar el movimiento: ${err}`,
                });
            } else {
                res.status(200).json({
                    status: 'success',
                    data: movimientoBoleto,
                });
            }
        }
    );
};

const actualizarMovimientoBoleto = (req, res) => {
    movimientoBoleto.findByIdAndUpdate(
        { _id: req.params.id },
        req.body,
        (err, movimientoBoleto) => {
            if (err) {
                res.status(400).json({
                    status: 'error',
                    message: `Error al actualizar el movimiento boleto: ${err}`,
                });
            } else {
                res.status(200).json({
                    status: 'success',
                    data: movimientoBoleto,
                });
            }
        }
    );
};

module.exports = {
    guardarMovimientoBoleto,
    getMovimientosBoletos,
    getMovimientoBoleto,
    eliminarMovimientoBoleto,
    actualizarMovimientoBoleto,
};
