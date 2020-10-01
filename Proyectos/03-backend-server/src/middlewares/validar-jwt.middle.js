const jwt = require("jsonwebtoken");

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

module.exports = { validateJWT };
