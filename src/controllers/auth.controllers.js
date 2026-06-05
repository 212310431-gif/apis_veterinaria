const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../config/mysql');

const register = async (req, res) => {
    try {
        const { nombre, email, password, rol } = req.body;

        if (!nombre || !email || !password) {
            return res.status(400).json({
                mensaje: 'El nombre, email y password son obligatorios'
            });
        }

        const [usuariosExistentes] = await pool.query(
            'SELECT * FROM usuarios WHERE email = ?',
            [email]
        );

        if (usuariosExistentes.length > 0) {
            return res.status(400).json({
                mensaje: 'El correo ya está registrado'
            });
        }

        const passwordEncriptado = await bcrypt.hash(password, 10);

        const [resultado] = await pool.query(
            `INSERT INTO usuarios (nombre, email, password, rol)
             VALUES (?, ?, ?, ?)`,
            [
                nombre,
                email,
                passwordEncriptado,
                rol || 'dueno'
            ]
        );

        const [nuevoUsuarioRows] = await pool.query(
            'SELECT id_usuario, nombre, email, rol FROM usuarios WHERE id_usuario = ?',
            [resultado.insertId]
        );

        res.status(201).json({
            mensaje: 'Usuario registrado correctamente',
            usuario: nuevoUsuarioRows[0]
        });

    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al registrar usuario',
            error: error.message
        });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                mensaje: 'El email y password son obligatorios'
            });
        }

        const [usuarios] = await pool.query(
            'SELECT * FROM usuarios WHERE email = ?',
            [email]
        );

        if (usuarios.length === 0) {
            return res.status(404).json({
                mensaje: 'Usuario no encontrado'
            });
        }

        const usuario = usuarios[0];

        const passwordValido = password === usuario.password;

        if (!passwordValido) {
            return res.status(401).json({
                mensaje: 'Contraseña incorrecta'
            });
        }

        const token = jwt.sign(
            {
                id_usuario: usuario.id_usuario,
                nombre: usuario.nombre,
                email: usuario.email,
                rol: usuario.rol
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '2h'
            }
        );

        res.json({
            mensaje: 'Inicio de sesión exitoso',
            token,
            usuario: {
                id_usuario: usuario.id_usuario,
                nombre: usuario.nombre,
                email: usuario.email,
                rol: usuario.rol
            }
        });

    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al iniciar sesión',
            error: error.message
        });
    }
};

module.exports = {
    register,
    login
};