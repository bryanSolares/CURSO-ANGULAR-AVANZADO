const { response } = require("express");
const Medico = require("../models/medico.model");

const getMedicos = async (req, res = response) => {
  try {
    const medicos = await Medico.find().populate("user", "name img").populate("hospital", "name img");

    res.json({
      ok: true,
      medicos,
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

const updateMedico = async (req, res = response) => {
  const { uid } = req;
  const { id } = req.params;

  try {
    const medico = await Medico.findById(id);
    if (!medico) {
      return res.status(500).json({
        ok: false,
        msg: "Médico no encontrado",
      });
    }

    const cambiosMedico = {
      ...req.body,
      user: uid,
    };

    const medicoActualizado = await Medico.findByIdAndUpdate(id, cambiosMedico, { new: true });

    res.json({
      ok: true,
      medico: medicoActualizado,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Error, vea el log",
    });
  }
};

const deleteMedico = async (req, res = response) => {
  const { id } = req.params;

  try {
    const medico = await Medico.findById(id);
    if (!medico) {
      return res.status(500).json({
        ok: false,
        msg: "Médico no encontrado",
      });
    }

    await Medico.findByIdAndDelete(id);

    res.json({
      ok: true,
      msg: "Médico eliminado",
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Error, vea el log",
    });
  }
};

const getByIdMedico = async (req, res = response) => {
  const { id } = req.params;
  try {
    const medico = await Medico.findById(id).populate("user", "name img").populate("hospital", "name img");

    if (!medico) {
      return res.status(500).json({
        ok: false,
        msg: "Médico no encontrado",
        medico: {},
      });
    }

    res.json({
      ok: true,
      medico,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Error, vea el log",
    });
  }
};

module.exports = {
  getMedicos,
  getByIdMedico,
  createMedico,
  updateMedico,
  deleteMedico,
};
