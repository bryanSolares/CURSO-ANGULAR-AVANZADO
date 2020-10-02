const { response } = require("express");
const bcrypt = require("bcryptjs");
const Usuario = require("../models/usuario.model");
const { generateJWT } = require("../helpers/jwt.helpers");

const getUsuarios = async (req, res) => {
  const desde = Number(req.query.desde) || 0;
  const limit = Number(req.query.limit) || 20;

  const [users, totalReg] = await Promise.all([
    Usuario.find({}, "name email role google").skip(desde).limit(limit),
    Usuario.count(),
  ]);

  res.json({ ok: true, users, count: totalReg, uid: req.uid });
};

const createUser = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    const existEmail = await Usuario.findOne({ email });

    if (existEmail)
      return res.status(400).json({ ok: false, msg: "Email already exists" });

    const newUser = new Usuario(req.body);
    const salt = bcrypt.genSaltSync(10);
    newUser.password = bcrypt.hashSync(password, salt);
    await newUser.save();
    const token = await generateJWT(newUser.id);

    res.json({ ok: true, user: newUser, token });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ ok: false, message: "Error inesperado, revisar logs" });
  }
};

const updateUser = async (req, res = response) => {
  // TODO: validar token y comprobar si es usuario correcto

  const uid = req.params.id;
  try {
    const usuarioDB = await Usuario.findById(uid);

    if (!usuarioDB) {
      return res.status(404).json({
        ok: false,
        msg: `No existe usuario con el ID: ${uid}`,
      });
    }

    const { password, google, email, ...campos } = req.body;

    if (usuarioDB.email !== email) {
      const existeEmail = await Usuario.findOne({ email });
      if (existeEmail) {
        return res.status(400).json({
          ok: false,
          msg: "Ya existe un usuario con ese email",
        });
      }
    }

    campos.email = email;

    const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, {
      new: true,
    });

    res.json({
      ok: true,
      user: usuarioActualizado,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ ok: false, message: "Error inesperado, revisar logs" });
  }
};

const deleteUser = async (req, res = response) => {
  try {
    const uid = req.params.id;

    const usuarioDB = await Usuario.findById(uid);

    if (!usuarioDB) {
      return res.status(404).json({
        ok: false,
        msg: `No existe usuario con el ID: ${uid}`,
      });
    }

    const user = await Usuario.findByIdAndDelete(uid);

    res.json({ ok: true, msg: `Usuario eliminado ID: ${uid}`, user });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ ok: false, message: "Error inesperado, revisar logs" });
  }
};

module.exports = {
  getUsuarios,
  createUser,
  updateUser,
  deleteUser,
};
