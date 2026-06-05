require('dotenv').config();

const app = require('./src/app');
const conectarMongo = require('./src/config/mongo');
require('./src/config/mysql');

const PORT = process.env.PORT || 3000;

const iniciarServidor = async () => {
    try {
        await conectarMongo();

        app.listen(PORT, () => {
            console.log(`Servidor corriendo en el puerto ${PORT}`);
        });

    } catch (error) {
        console.error('Error al iniciar servidor');
        console.error(error);
    }
};

iniciarServidor();
