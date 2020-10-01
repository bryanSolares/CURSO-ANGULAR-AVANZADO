const { response } = require("express");

const getHospitales = (req, res = response) => {};
const createHospital = (req, res = response) => {};
const updateHospital = (req, res = response) => {};
const deleteHospital = (req, res = response) => {};

module.exports = {
  getHospitales,
  createHospital,
  updateHospital,
  deleteHospital,
};
