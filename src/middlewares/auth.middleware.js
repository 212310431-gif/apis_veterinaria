const jwt = require('jsonwebtoken');

const verificarToken = (req, res, next) => {

    try {

        const token = req.headers.authorization;

        if (!token) {
            return res.status(401).json({
                mensaje: "Token requerido"
            });
        }

        const tokenLimpio = token.replace('Bearer ', '');

        const decoded = jwt.verify(
            tokenLimpio,
            process.env.JWT_SECRET
        );

        req.usuario = decoded;

        next();

    } catch (error) {

        res.status(401).json({
            mensaje: "Token inválido"
        });
    }
};

module.exports = verificarToken;