const { response } = require("express");
const Hospital = require("../models/hospital.model");

const getHospitales = async (req, res = response) => {
  try {
    const hospitales = await Hospital.find().populate("user", "name img");

    res.json({
      ok: true,
      hospitales,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Error, vea el log",
    });
  }
};

const createHospital = async (req, res = response) => {
  const uid = req.uid;
  const hospitalNew = await Hospital({ user: uid, ...req.body });
  try {
    const hospitalSaved = await hospitalNew.save();
    res.json({
      ok: true,
      hospital: hospitalSaved,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Error, vea el log",
    });
  }
};

const updateHospital = async (req, res = response) => {
  const { uid } = req;
  const { id } = req.params;

  try {
    const hospital = await Hospital.findById(id);
    if (!hospital) {
      return res.status(500).json({
        ok: false,
        msg: "Hospital no encontrado",
      });
    }

    const cambiosHospital = {
      ...req.body,
      user: uid,
    };

    const hospitalActualizado = await Hospital.findByIdAndUpdate(
      id,
      cambiosHospital,
      { new: true }
    );

    res.json({
      ok: true,
      hospital: hospitalActualizado,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Error, vea el log",
    });
  }
};

const deleteHospital = async (req, res = response) => {
  const { id } = req.params;

  try {
    const hospital = await Hospital.findById(id);
    if (!hospital) {
      return res.status(500).json({
        ok: false,
        msg: "Hospital no encontrado",
      });
    }

    await Hospital.findByIdAndDelete(id);

    res.json({
      ok: true,
      msg: "Hospital eliminado",
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Error, vea el log",
    });
  }
};

module.exports = {
  getHospitales,
  createHospital,
  updateHospital,
  deleteHospital,
};
