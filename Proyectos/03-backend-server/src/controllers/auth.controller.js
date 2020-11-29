const { response } = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/usuario.model");
const { generateJWT } = require("../helpers/jwt.helpers");
const { googleVerify } = require("../helpers/google-helpers");
const Usuario = require("../models/usuario.model");
const getMenuFrontEnd = require("../helpers/menu-helper");

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
      menu: getMenuFrontEnd(userDB.role),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ ok: false, message: "Error inesperado, revisar logs" });
  }
};

const googleSignIn = async (req, res = response) => {
  const { token } = req.body;

  try {
    const dataGoogle = await googleVerify(token);
    const usuarioDB = await Usuario.findOne({ email: dataGoogle.email });
    let usuarioNuevo;

    if (!usuarioDB) {
      usuarioNuevo = new Usuario({
        name: dataGoogle.name,
        email: dataGoogle.email,
        password: "@@@",
        img: dataGoogle.picture,
        google: true,
      });
    } else {
      usuarioNuevo = usuarioDB;
      usuarioNuevo.google = true;
    }

    await usuarioNuevo.save();
    const tokenNew = await generateJWT(usuarioNuevo.id);

    res.json({
      ok: true,
      msg: "Sign In Google",
      data: dataGoogle,
      token: tokenNew,
      menu: getMenuFrontEnd(usuarioNuevo.role),
    });
  } catch (error) {
    console.log(error, "Error al verificar token google");
    res.status(404).json({
      ok: false,
      msg: "Token no es correcto",
    });
  }
};

const renewToken = async (req, res = response) => {
  const { uid } = req;
  const token = await generateJWT(uid);
  const user = await Usuario.findById(uid);
  res.json({
    ok: true,
    token,
    user,
    menu: getMenuFrontEnd(user.role),
  });
};

module.exports = {
  login,
  googleSignIn,
  renewToken,
};
