const express = require('express');
const router = express.Router();

const {
    crearUsuario,
    obtenerUsuarios,
    obtenerUsuarioPorId
} = require('../controllers/usuario.controller');

router.post('/usuarios', crearUsuario);

router.get('/usuarios', obtenerUsuarios);

router.get('/usuarios/:id', obtenerUsuarioPorId);

module.exports = router;