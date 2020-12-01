const jwt = require("jsonwebtoken");
const User = require("../models/usuario.model");

const validateJWT = (req, res, next) => {
  try {
    const token = req.header("x-token");

    if (!token) {
      throw new Error();
    }

    const { uid } = jwt.verify(token, process.env.JWT_SECRET);
    req.uid = uid;
    next();
  } catch (error) {
    res.status(401).json({
      ok: false,
      msg: "No existe token en la peticion o el token no es válido",
    });
  }
};

const validateROLE = async (req, res, next) => {
  const { uid } = req;
  try {
    const userDB = await User.findById(uid);

    if (!userDB) {
      return res.status(404).json({
        ok: false,
        msg: "Usuario no existe",
      });
    }

    if (userDB.role !== "ADMIN_ROLE") {
      return res.status(403).json({
        ok: false,
        msg: "El usuario no tiene los permisos necesarios para realizar la acción",
      });
    }

    next();
  } catch (error) {
    res.status(401).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const validateUpdateProfile = async (req, res, next) => {
  const { uid } = req;
  const { id } = req.params;
  console.log(uid, id);
  try {
    const userDB = await User.findById(uid);

    if (!userDB) {
      return res.status(404).json({
        ok: false,
        msg: "Usuario no existe",
      });
    }

    if (userDB.role === "ADMIN_ROLE" || uid === id) {
      next();
    } else {
      return res.status(403).json({
        ok: false,
        msg: "El usuario no tiene los permisos necesarios para realizar la acción",
      });
    }
  } catch (error) {
    res.status(401).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

module.exports = { validateJWT, validateROLE, validateUpdateProfile };
