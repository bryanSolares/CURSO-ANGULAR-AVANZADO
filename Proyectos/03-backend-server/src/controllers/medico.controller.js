const { response } = require("express");
const Medico = require("../models/medico.model");

const getMedicos = async (req, res = response) => {
  try {
    const medicos = await Medico.find()
      .populate("user", "name img")
      .populate("hospital", "name img");

    res.json({
      ok: true,
      hospitales: medicos,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Error, vea el log",
    });
  }
};
const createMedico = async (req, res = response) => {
  const uid = req.uid;
  const medicoNew = await Medico({ user: uid, ...req.body });
  try {
    const medicoSaved = await medicoNew.save();
    res.json({
      ok: true,
      medico: medicoSaved,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Error, vea el log",
    });
  }
};
const updateMedico = (req, res = response) => {};
const deleteMedico = (req, res = response) => {};

module.exports = {
  getMedicos,
  createMedico,
  updateMedico,
  deleteMedico,
};
