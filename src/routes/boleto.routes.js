const express = require('express');
const boletoController = require('../controllers/boletoController');
const router = express.Router();

router.put('/boleto', boletoController.guardarBoleto);
router.get('/boleto/:id', boletoController.getBoleto);
router.get('/boletos', boletoController.getBoletos);
router.delete('/boleto/:id', boletoController.eliminarBoleto);
router.post('/boleto/:id', boletoController.actualizarBoleto);

module.exports = router;