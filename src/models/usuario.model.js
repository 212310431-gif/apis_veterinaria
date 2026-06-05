const pool = require('../config/mysql');

const Usuario = {
    obtenerTodos: async () => {
        const [usuarios] = await pool.query(
            'SELECT id_usuario, nombre, email, rol FROM usuarios ORDER BY id_usuario ASC'
        );

        return usuarios;
    },

    obtenerPorId: async (id_usuario) => {
        const [usuarios] = await pool.query(
            'SELECT id_usuario, nombre, email, rol FROM usuarios WHERE id_usuario = ?',
            [id_usuario]
        );

        return usuarios[0];
    },

    obtenerPorEmail: async (email) => {
        const [usuarios] = await pool.query(
            'SELECT * FROM usuarios WHERE email = ?',
            [email]
        );

        return usuarios[0];
    },

    crear: async (usuario) => {
        const { nombre, email, password, rol } = usuario;

        const [resultado] = await pool.query(
            `INSERT INTO usuarios (nombre, email, password, rol)
             VALUES (?, ?, ?, ?)`,
            [nombre, email, password, rol]
        );

        const [usuarioCreado] = await pool.query(
            'SELECT id_usuario, nombre, email, rol FROM usuarios WHERE id_usuario = ?',
            [resultado.insertId]
        );

        return usuarioCreado[0];
    },

    actualizar: async (id_usuario, usuario) => {
        const { nombre, email, rol } = usuario;

        const [resultado] = await pool.query(
            `UPDATE usuarios
             SET nombre = ?, email = ?, rol = ?
             WHERE id_usuario = ?`,
            [nombre, email, rol, id_usuario]
        );

        if (resultado.affectedRows === 0) {
            return null;
        }

        const [usuarioActualizado] = await pool.query(
            'SELECT id_usuario, nombre, email, rol FROM usuarios WHERE id_usuario = ?',
            [id_usuario]
        );

        return usuarioActualizado[0];
    },

    eliminar: async (id_usuario) => {
        const [usuarios] = await pool.query(
            'SELECT id_usuario, nombre, email, rol FROM usuarios WHERE id_usuario = ?',
            [id_usuario]
        );

        if (usuarios.length === 0) {
            return null;
        }

        await pool.query(
            'DELETE FROM usuarios WHERE id_usuario = ?',
            [id_usuario]
        );

        return usuarios[0];
    }
};

module.exports = Usuario;