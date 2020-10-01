const { response } = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/usuario.model");
const { generateJWT } = require("../helpers/jwt.helpers");

const login = async (req, res = response) => {
  try {
    const { email, password } = req.body;

    const userDB = await User.findOne({ email });

    if (!userDB) {
      return res.status(404).json({
        ok: false,
        msg: `No existe usuario o el password es incorrecto`,
      });
    }

    const validPassword = bcrypt.compareSync(password, userDB.password);
    if (!validPassword) {
      return res.status(404).json({
        ok: false,
        msg: `No existe usuario o el password es incorrecto`,
      });
    }

    const token = await generateJWT(userDB.id);

    res.json({
      ok: true,
      token,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ ok: false, message: "Error inesperado, revisar logs" });
  }
};

module.exports = {
  login,
};
