const express = require('express');

const veterinarioRoutes = require('./routes/veterinario.routes');
const mascotaRoutes = require('./routes/mascota.routes');
const citasRoutes = require('./routes/citas.routes');
const usuarioRoutes = require('./routes/usuario.routes');
const expedienteRoutes = require('./routes/expediente.routes');
const authRoutes = require('./routes/auth.routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.json({ mensaje: 'API Veterinaria funcionando' });
});

app.use('/api', veterinarioRoutes);
app.use('/api', mascotaRoutes);
app.use('/api', citasRoutes);
app.use('/api', usuarioRoutes);
app.use('/api', expedienteRoutes);
app.use('/api/auth', authRoutes);

module.exports = app;