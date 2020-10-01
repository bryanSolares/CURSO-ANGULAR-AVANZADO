const { response } = require("express");

const getMedicos = (req, res = response) => {};
const createMedico = (req, res = response) => {};
const updateMedico = (req, res = response) => {};
const deleteMedico = (req, res = response) => {};

module.exports = {
  getMedicos,
  createMedico,
  updateMedico,
  deleteMedico,
};
