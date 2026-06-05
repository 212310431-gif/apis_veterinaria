const Expediente = require('../models/expediente.model');


const obtenerExpedientes = async (req, res) => {

    try {

        const expedientes = await Expediente.find();

        res.json(expedientes);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            mensaje: "Error al obtener expedientes"
        });
    }
};


const obtenerExpedientePorMascota = async (req, res) => {

    try {

        const { id } = req.params;

        const expediente = await Expediente.findOne({
            id_mascota: parseInt(id)
        });

        if (!expediente) {
            return res.status(404).json({
                mensaje: "Expediente no encontrado"
            });
        }

        res.json(expediente);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            mensaje: "Error al obtener expediente"
        });
    }
};


const crearExpediente = async (req, res) => {

    try {

        const nuevoExpediente = new Expediente(req.body);

        await nuevoExpediente.save();

        res.status(201).json({
            mensaje: "Expediente creado correctamente",
            expediente: nuevoExpediente
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            mensaje: "Error al crear expediente"
        });
    }
};


const agregarHistorialClinico = async (req, res) => {

    try {

        const { id } = req.params;

        const expediente = await Expediente.findOne({
            id_mascota: parseInt(id)
        });

        if (!expediente) {
            return res.status(404).json({
                mensaje: "Expediente no encontrado"
            });
        }

        expediente.historia_clinica.push(req.body);

        expediente.updated_at = new Date();

        await expediente.save();

        res.json({
            mensaje: "Historial clínico agregado",
            expediente
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            mensaje: "Error al agregar historial"
        });
    }
};

module.exports = {
    obtenerExpedientes,
    obtenerExpedientePorMascota,
    crearExpediente,
    agregarHistorialClinico
};