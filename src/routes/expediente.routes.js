const express = require('express');
const router = express.Router();

const {
    obtenerExpedientes,
    obtenerExpedientePorMascota,
    crearExpediente,
    agregarHistorialClinico
} = require('../controllers/expediente.controller');

const verificarToken = require('../middlewares/auth.middleware');
const verificarRol = require('../middlewares/rol.middleware');


router.get(
    '/expedientes',
    verificarToken,
    verificarRol('admin', 'veterinario'),
    obtenerExpedientes
);


router.get(
    '/expedientes/:id',
    verificarToken,
    verificarRol('admin', 'veterinario'),
    obtenerExpedientePorMascota
);


router.post(
    '/expedientes',
    verificarToken,
    verificarRol('admin'),
    crearExpediente
);


router.put(
    '/expedientes/:id/historial',
    verificarToken,
    verificarRol('admin', 'veterinario'),
    agregarHistorialClinico
);

module.exports = router;