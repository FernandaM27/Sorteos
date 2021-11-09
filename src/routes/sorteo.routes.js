const express = require('express');
const sorteoController = require('../controllers/sorteoController');
const router = express.Router();

router.put('/sorteo', sorteoController.guardarSorteo);
router.get('/sorteo/:id', sorteoController.getSorteo);
router.get('/sorteos', sorteoController.getSorteos);
router.delete('/sorteo/:id', sorteoController.eliminarSorteo);
router.post('/sorteo/:id', sorteoController.actualizarSorteo);

module.exports = router;