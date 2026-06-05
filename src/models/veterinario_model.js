const pool = require('../config/mysql');

const Veterinario = {
    obtenerTodos: async () => {
        const [veterinarios] = await pool.query(
            'SELECT * FROM veterinarios ORDER BY id_veterinario ASC'
        );

        return veterinarios;
    },

    obtenerPorId: async (id_veterinario) => {
        const [veterinarios] = await pool.query(
            'SELECT * FROM veterinarios WHERE id_veterinario = ?',
            [id_veterinario]
        );

        return veterinarios[0];
    },

    crear: async (veterinario) => {
        const { nombre, especialidad, telefono, email } = veterinario;

        const [resultado] = await pool.query(
            `INSERT INTO veterinarios (nombre, especialidad, telefono, email)
             VALUES (?, ?, ?, ?)`,
            [nombre, especialidad, telefono, email]
        );

        const [veterinarioCreado] = await pool.query(
            'SELECT * FROM veterinarios WHERE id_veterinario = ?',
            [resultado.insertId]
        );

        return veterinarioCreado[0];
    },

    actualizar: async (id_veterinario, veterinario) => {
        const { nombre, especialidad, telefono, email } = veterinario;

        const [resultado] = await pool.query(
            `UPDATE veterinarios
             SET nombre = ?, especialidad = ?, telefono = ?, email = ?
             WHERE id_veterinario = ?`,
            [nombre, especialidad, telefono, email, id_veterinario]
        );

        if (resultado.affectedRows === 0) {
            return null;
        }

        const [veterinarioActualizado] = await pool.query(
            'SELECT * FROM veterinarios WHERE id_veterinario = ?',
            [id_veterinario]
        );

        return veterinarioActualizado[0];
    },

    eliminar: async (id_veterinario) => {
        const [veterinarios] = await pool.query(
            'SELECT * FROM veterinarios WHERE id_veterinario = ?',
            [id_veterinario]
        );

        if (veterinarios.length === 0) {
            return null;
        }

        await pool.query(
            'DELETE FROM veterinarios WHERE id_veterinario = ?',
            [id_veterinario]
        );

        return veterinarios[0];
    }
};

module.exports = Veterinario;