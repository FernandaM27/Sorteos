const express = require('express');
const personaController = require('../controllers/personaController');
const router = express.Router();

router.put('/persona', personaController.guardarPersona);
router.get('/persona/:id', personaController.getPersona);
router.get('/persona', personaController.getPersonas);
router.delete('/persona/:id', personaController.eliminarPersona);
router.post('/persona/:id', personaController.actualizarPersona);

module.exports = router;