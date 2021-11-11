const express = require('express');
const movimientoBoletoController = require('../controllers/movimientoBoletoController');
const router = express.Router();

router.put('/movimientoBoleto', movimientoBoletoController.guardarMovimientoBoleto);
router.get('/movimientoBoleto/:id', movimientoBoletoController.getMovimientoBoleto);
router.get('/movimientosBoletos', movimientoBoletoController.getMovimientosBoletos);
router.delete('/movimientoBoletos/:id', movimientoBoletoController.eliminarMovimientoBoleto);
router.post('/movimientoBoletos/:id', movimientoBoletoController.actualizarMovimientoBoleto);

module.exports = router;