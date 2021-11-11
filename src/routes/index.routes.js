const express = require('express');
const adminRoutes = require('./admin.routes');
const boletoRoutes = require('./boleto.routes');
const movimientoBoletoRoutes = require('./movientoBoleto.routes');
const personasRoutes = require('./personas.routes');
const sorteoRoutes = require('./sorteo.routes');
const router = express.Router();

router.use('/', adminRoutes);
router.use('/', boletoRoutes);
router.use('/', movimientoBoletoRoutes);
router.use('/', personasRoutes);
router.use('/', sorteoRoutes);

module.exports = router;
