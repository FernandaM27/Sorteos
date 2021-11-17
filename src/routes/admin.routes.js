const express = require('express');
const adminController = require('../controllers/adminController');
const router = express.Router();

router.post('/admin', adminController.guardarAdmin);
router.get('/admin/:id', adminController.getAdmin);
router.get('/admins', adminController.getAdmins);
router.delete('/admin/:id', adminController.eliminarAdmin);
router.put('/admin/:id', adminController.actualizarAdmin);

module.exports = router;