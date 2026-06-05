const pool = require('../config/mysql');

const crearCita = async (req, res) => {
    try {
        const {
            fecha,
            hora,
            motivo,
            id_mascota,
            id_veterinario
        } = req.body;

        const [resultado] = await pool.query(
            `INSERT INTO citas
            (fecha, hora, motivo, id_mascota, id_veterinario)
            VALUES (?, ?, ?, ?, ?)`,
            [fecha, hora, motivo, id_mascota, id_veterinario]
        );

        const [citaCreada] = await pool.query(
            `SELECT
                c.id_cita,
                c.fecha,
                c.hora,
                c.motivo,
                c.id_mascota,
                c.id_veterinario,
                m.nombre AS mascota,
                v.nombre AS veterinario
            FROM citas c
            JOIN mascotas m
                ON c.id_mascota = m.id_mascota
            JOIN veterinarios v
                ON c.id_veterinario = v.id_veterinario
            WHERE c.id_cita = ?`,
            [resultado.insertId]
        );

        res.status(201).json({
            mensaje: "Cita creada",
            cita: citaCreada[0]
        });

    } catch (error) {
        console.log("ERROR REAL:", error);

        res.status(500).json({
            mensaje: "Error al crear cita",
            error: error.message
        });
    }
};

const obtenerCitas = async (req, res) => {
    try {
        const [citas] = await pool.query(`
            SELECT
                c.id_cita,
                c.fecha,
                c.hora,
                c.motivo,
                c.id_mascota,
                c.id_veterinario,
                m.nombre AS mascota,
                v.nombre AS veterinario
            FROM citas c
            JOIN mascotas m
                ON c.id_mascota = m.id_mascota
            JOIN veterinarios v
                ON c.id_veterinario = v.id_veterinario
            ORDER BY c.id_cita ASC
        `);

        res.json(citas);

    } catch (error) {
        console.log(error);

        res.status(500).json({
            mensaje: "Error al obtener citas",
            error: error.message
        });
    }
};

const obtenerCitasPorVeterinario = async (req, res) => {
    try {
        const { id } = req.params;

        const [citas] = await pool.query(`
            SELECT
                c.id_cita,
                c.fecha,
                c.hora,
                c.motivo,
                c.id_mascota,
                c.id_veterinario,
                m.nombre AS mascota,
                v.nombre AS veterinario
            FROM citas c
            JOIN mascotas m
                ON c.id_mascota = m.id_mascota
            JOIN veterinarios v
                ON c.id_veterinario = v.id_veterinario
            WHERE c.id_veterinario = ?
            ORDER BY c.id_cita ASC
        `, [id]);

        res.json(citas);

    } catch (error) {
        console.log(error);

        res.status(500).json({
            mensaje: "Error al obtener citas",
            error: error.message
        });
    }
};

const eliminarCita = async (req, res) => {
    try {
        const { id } = req.params;

        const [citas] = await pool.query(
            'SELECT * FROM citas WHERE id_cita = ?',
            [id]
        );

        if (citas.length === 0) {
            return res.status(404).json({
                mensaje: "Cita no encontrada"
            });
        }

        await pool.query(
            'DELETE FROM citas WHERE id_cita = ?',
            [id]
        );

        res.json({
            mensaje: "Cita eliminada",
            cita: citas[0]
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            mensaje: "Error al eliminar cita",
            error: error.message
        });
    }
};

module.exports = {
    crearCita,
    obtenerCitas,
    obtenerCitasPorVeterinario,
    eliminarCita
};