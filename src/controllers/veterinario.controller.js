const pool = require('../config/mysql');

const obtenerVeterinarios = async (req, res) => {
    try {
        const [veterinarios] = await pool.query(
            'SELECT * FROM veterinarios ORDER BY id_veterinario ASC'
        );

        res.json(veterinarios);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            mensaje: 'Error al obtener veterinarios',
            error: error.message
        });
    }
};

const obtenerVeterinarioPorId = async (req, res) => {
    try {
        const { id } = req.params;

        const [veterinarios] = await pool.query(
            'SELECT * FROM veterinarios WHERE id_veterinario = ?',
            [id]
        );

        if (veterinarios.length === 0) {
            return res.status(404).json({
                mensaje: 'Veterinario no encontrado'
            });
        }

        res.json(veterinarios[0]);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            mensaje: 'Error al obtener veterinario',
            error: error.message
        });
    }
};

const crearVeterinario = async (req, res) => {
    try {
        const { nombre, especialidad, telefono, email } = req.body;

        const [resultado] = await pool.query(
            `INSERT INTO veterinarios (nombre, especialidad, telefono, email)
             VALUES (?, ?, ?, ?)`,
            [nombre, especialidad, telefono, email]
        );

        const [veterinarioCreado] = await pool.query(
            'SELECT * FROM veterinarios WHERE id_veterinario = ?',
            [resultado.insertId]
        );

        res.status(201).json({
            mensaje: 'Veterinario creado correctamente',
            veterinario: veterinarioCreado[0]
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            mensaje: 'Error al crear veterinario',
            error: error.message
        });
    }
};

const actualizarVeterinario = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, especialidad, telefono, email } = req.body;

        const [resultado] = await pool.query(
            `UPDATE veterinarios
             SET nombre = ?, especialidad = ?, telefono = ?, email = ?
             WHERE id_veterinario = ?`,
            [nombre, especialidad, telefono, email, id]
        );

        if (resultado.affectedRows === 0) {
            return res.status(404).json({
                mensaje: 'Veterinario no encontrado'
            });
        }

        const [veterinarioActualizado] = await pool.query(
            'SELECT * FROM veterinarios WHERE id_veterinario = ?',
            [id]
        );

        res.json({
            mensaje: 'Veterinario actualizado correctamente',
            veterinario: veterinarioActualizado[0]
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            mensaje: 'Error al actualizar veterinario',
            error: error.message
        });
    }
};

const eliminarVeterinario = async (req, res) => {
    try {
        const { id } = req.params;

        const [veterinarios] = await pool.query(
            'SELECT * FROM veterinarios WHERE id_veterinario = ?',
            [id]
        );

        if (veterinarios.length === 0) {
            return res.status(404).json({
                mensaje: 'Veterinario no encontrado'
            });
        }

        await pool.query(
            'DELETE FROM veterinarios WHERE id_veterinario = ?',
            [id]
        );

        res.json({
            mensaje: 'Veterinario eliminado correctamente',
            veterinario: veterinarios[0]
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            mensaje: 'Error al eliminar veterinario',
            error: error.message
        });
    }
};

module.exports = {
    obtenerVeterinarios,
    obtenerVeterinarioPorId,
    crearVeterinario,
    actualizarVeterinario,
    eliminarVeterinario
};