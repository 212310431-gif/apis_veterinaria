const express = require('express');
const router = express.Router();

const {
    obtenerVeterinarios,
    obtenerVeterinarioPorId,
    crearVeterinario,
    actualizarVeterinario,
    eliminarVeterinario
} = require('../controllers/veterinario.controller');

const verificarToken = require('../middlewares/auth.middleware');
const verificarRol = require('../middlewares/rol.middleware');


router.get(
    '/veterinarios',
    verificarToken,
    obtenerVeterinarios
);

router.get(
    '/veterinarios/:id',
    verificarToken,
    obtenerVeterinarioPorId
);


router.post(
    '/veterinarios',
    verificarToken,
    verificarRol('admin'),
    crearVeterinario
);


router.put(
    '/veterinarios/:id',
    verificarToken,
    verificarRol('admin'),
    actualizarVeterinario
);


router.delete(
    '/veterinarios/:id',
    verificarToken,
    verificarRol('admin'),
    eliminarVeterinario
);

module.exports = router;