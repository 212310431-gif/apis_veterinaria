require('dotenv').config();
const pool = require('../config/mysql');

const crearTablas = async () => {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS usuarios (
                id_usuario INT AUTO_INCREMENT PRIMARY KEY,
                nombre VARCHAR(100),
                email VARCHAR(100),
                password VARCHAR(255),
                rol VARCHAR(50)
            )
        `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS veterinarios (
                id_veterinario INT AUTO_INCREMENT PRIMARY KEY,
                nombre VARCHAR(100),
                especialidad VARCHAR(100),
                telefono VARCHAR(20),
                email VARCHAR(100)
            )
        `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS mascotas (
                id_mascota INT AUTO_INCREMENT PRIMARY KEY,
                nombre VARCHAR(100),
                especie VARCHAR(50),
                raza VARCHAR(50),
                edad INT,
                id_dueno INT,
                FOREIGN KEY (id_dueno) REFERENCES usuarios(id_usuario)
            )
        `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS citas (
                id_cita INT AUTO_INCREMENT PRIMARY KEY,
                fecha DATE,
                hora TIME,
                motivo TEXT,
                id_mascota INT,
                id_veterinario INT,
                FOREIGN KEY (id_mascota) REFERENCES mascotas(id_mascota),
                FOREIGN KEY (id_veterinario) REFERENCES veterinarios(id_veterinario)
            )
        `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS pagos (
                id_pago INT AUTO_INCREMENT PRIMARY KEY,
                monto DECIMAL(10,2),
                fecha DATE,
                metodo VARCHAR(50),
                id_cita INT,
                FOREIGN KEY (id_cita) REFERENCES citas(id_cita)
            )
        `);

        await pool.query(`
            INSERT INTO usuarios (nombre, email, password, rol)
            VALUES
            ('Admin', 'admin@gmail.com', '123456', 'admin'),
            ('Juan Perez', 'juan@email.com', '123456', 'dueno')
        `);

        await pool.query(`
            INSERT INTO mascotas (nombre, especie, raza, edad, id_dueno)
            VALUES
            ('Firulais', 'Perro', 'Labrador', 3, 2)
        `);

        await pool.query(`
            INSERT INTO veterinarios (nombre, especialidad, telefono, email)
            VALUES
            ('Dra. Ana', 'Medicina general', '6441234567', 'ana@veterinaria.com')
        `);

        console.log('Tablas y datos creados correctamente en Aiven');
        process.exit();

    } catch (error) {
        console.error('Error al crear tablas:', error.message);
        process.exit(1);
    }
};

crearTablas();