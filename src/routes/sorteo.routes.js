const express = require('express');
const sorteoController = require('../controllers/sorteoController');
const router = express.Router();

router.post('/sorteo/:token', sorteoController.guardarSorteo);
router.get('/sorteos/:token', sorteoController.getSorteos);
router.get('/sorteo/:token/:id', sorteoController.getSorteo);
router.get('/sorteoTitulo/:token/:titulo', sorteoController.getSorteoTitulo);
router.get('/sorteoEstado/:token/:estado', sorteoController.getSorteoEstado);
router.delete('/sorteo/:token/:id', sorteoController.eliminarSorteo);
router.put('/sorteo/:token/:id', sorteoController.actualizarSorteo);
             
module.exports = router;