require('dotenv').config();

const app = require('./src/app');
const conectarMongo = require('./src/config/mongo');
require('./src/config/mysql');

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);

    try {
        await conectarMongo();
        console.log('MongoDB conectado correctamente');
    } catch (error) {
        console.error('Error al conectar con MongoDB:', error.message);
    }
});