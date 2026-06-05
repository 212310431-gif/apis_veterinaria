const express = require('express');
const router = express.Router();

const { obtenerMascotaCompleta } = require('../controllers/mascota.controller');

router.get('/mascotas/:id/completo', obtenerMascotaCompleta);

module.exports = router;