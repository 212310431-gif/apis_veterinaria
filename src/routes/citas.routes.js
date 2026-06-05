const express = require('express');
const router = express.Router();

const {
    crearCita,
    obtenerCitas,
    obtenerCitasPorVeterinario,
    eliminarCita
} = require('../controllers/citas.controller');

const verificarToken = require('../middlewares/auth.middleware');
const verificarRol = require('../middlewares/rol.middleware');


router.post(
    '/citas',
    verificarToken,
    verificarRol('admin', 'veterinario', 'cliente'),
    crearCita
);


router.get(
    '/citas',
    verificarToken,
    verificarRol('admin', 'veterinario'),
    obtenerCitas
);


router.get(
    '/citas/veterinario/:id',
    verificarToken,
    verificarRol('admin', 'veterinario'),
    obtenerCitasPorVeterinario
);


router.delete(
    '/citas/:id',
    verificarToken,
    verificarRol('admin', 'veterinario'),
    eliminarCita
);

module.exports = router;