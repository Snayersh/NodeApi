const bcrypt = require('bcryptjs');
const { usuarios } = require('../models/modelUsuario');

// Iniciar sesión
exports.iniciarSesion = async (req, res) => {
    const { correo_electronico, password } = req.body;
    if(!correo_electronico || !password) {
        return res.status(400).json({error:'Correo electronico y contrase;a son necesarios'})
    }
    try {
        //busqueda del usuario
        const usuario = await usuarios.findOne({ where: { correo_electronico } });

        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        // Comparacion de contrase;as
        const esPasswordCorrecta = await bcrypt.compare(password, usuario.password);

        if (!esPasswordCorrecta) {
            return res.status(401).json({ error: 'contrase;a incorrecta' });
        }

        res.status(200).json({ mensaje: 'Inicio de sesión exitoso' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al iniciar sesión' });
    }
};
