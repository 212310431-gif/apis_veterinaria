const pool = require('../config/mysql');
const Expediente = require('../models/expediente.model');

const obtenerMascotaCompleta = async (req, res) => {
    try {
        const { id } = req.params;

        const [mascotas] = await pool.query(
            "SELECT * FROM mascotas WHERE id_mascota = ?",
            [id]
        );

        if (mascotas.length === 0) {
            return res.status(404).json({
                mensaje: "Mascota no encontrada"
            });
        }

        const mascota = mascotas[0];

        const expediente = await Expediente.findOne({
            id_mascota: parseInt(id)
        });

        res.json({
            mascota,
            expediente: expediente || null
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            mensaje: "Error al obtener datos",
            error: error.message
        });
    }
};

module.exports = {
    obtenerMascotaCompleta
};