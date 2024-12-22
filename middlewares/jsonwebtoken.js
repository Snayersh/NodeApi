const jwt = require("jsonwebtoken");

const verificartoken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ mensaje: "Acceso denegado" });
  }
  try {
    const decodificar = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodificar;
    next();
  } catch (error) {
    return res.status(403).json({ mensaje: "token invalido o expirado" });
  }
};

const tokencliente = (req, res, next) => {
  if (req.user.rol_idrol !== 2) {
    return res.status(403).json({ menssage: "Acceso degenado solo clientes pueden accender" });
  }
  next();
};
const tokenoperadores = (req, res, next) => {
  if (req.user.rol_idrol !== 1) {
    return res.status(403).json({mensaje: "Acceso denegado solo los operadores pueden accender"});
  }
  next();
};

const tokenoperadorycliente = (req, res, next) => {
  if (req.user.rol_idrol !== 1 && req.user.rol_idrol !== 2) {
    return res.status(403).json({ mensaje: "Acceso denegado" });
  }
  next();
};
module.exports = {verificartoken, tokencliente, tokenoperadores, tokenoperadorycliente };
