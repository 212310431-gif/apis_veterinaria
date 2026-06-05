const mongoose = require('mongoose');

const expedienteSchema = new mongoose.Schema({
    id_mascota: {
        type: Number,
        required: true,
        index: true
    },
    historia_clinica: [{
        fecha: {
            type: Date,
            default: Date.now
        },
        diagnostico: String,
        tratamiento: String,
        medicamentos: [String],
        observaciones: String,
        id_veterinario: Number,
        temperatura: Number,
        peso: Number
    }],
    vacunas: [{
        nombre: String,
        fecha_aplicacion: Date,
        fecha_proxima: Date,
        lote: String
    }],
    alergias: [String],
    enfermedades_cronicas: [String],
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Expediente', expedienteSchema);