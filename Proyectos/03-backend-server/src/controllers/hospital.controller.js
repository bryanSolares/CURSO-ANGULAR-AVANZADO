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
const updateHospital = (req, res = response) => {};
const deleteHospital = (req, res = response) => {};

module.exports = {
  getHospitales,
  createHospital,
  updateHospital,
  deleteHospital,
};
