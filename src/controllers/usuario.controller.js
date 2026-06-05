const Usuario = require('../models/usuario.model');

const crearUsuario = async (req, res) => {
    try {
        const nuevoUsuario = await Usuario.crear(req.body);

        res.status(201).json({
            mensaje: "Usuario creado correctamente",
            usuario: nuevoUsuario
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            mensaje: "Error al crear usuario",
            error: error.message
        });
    }
};

const obtenerUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.obtenerTodos();

        res.json(usuarios);

    } catch (error) {
        console.log(error);

        res.status(500).json({
            mensaje: "Error al obtener usuarios",
            error: error.message
        });
    }
};

const obtenerUsuarioPorId = async (req, res) => {
    try {
        const { id } = req.params;

        const usuario = await Usuario.obtenerPorId(id);

        if (!usuario) {
            return res.status(404).json({
                mensaje: "Usuario no encontrado"
            });
        }

        res.json(usuario);

    } catch (error) {
        console.log(error);

        res.status(500).json({
            mensaje: "Error al obtener usuario",
            error: error.message
        });
    }
};

module.exports = {
    crearUsuario,
    obtenerUsuarios,
    obtenerUsuarioPorId
};