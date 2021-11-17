const express = require('express');
const sorteoController = require('../controllers/sorteoController');
const router = express.Router();

router.post('/sorteo/:token', sorteoController.guardarSorteo);
router.get('/sorteo/:id', sorteoController.getSorteo);
router.get('/sorteos', sorteoController.getSorteos);
router.delete('/sorteo/:id', sorteoController.eliminarSorteo);
router.put('/sorteo/:id', sorteoController.actualizarSorteo);

module.exports = router;