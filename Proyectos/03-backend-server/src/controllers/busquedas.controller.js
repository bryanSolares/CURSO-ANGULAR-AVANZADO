const { response } = require("express");
const Usuario = require("../models/usuario.model");
const Hospital = require("../models/hospital.model");
const Medico = require("../models/medico.model");

const getTodo = async (req, res = response) => {
  const busqueda = req.params.busqueda;
  const regex = new RegExp(busqueda, "i");

  const [usuarios, hospitales, medicos] = await Promise.all([
    Usuario.find({ name: regex }),
    Hospital.find({ name: regex }),
    Medico.find({ name: regex }),
  ]);

  res.json({
    ok: true,
    usuarios,
    hospitales,
    medicos,
  });
};

const getCollectionsDocs = async (req, res = response) => {
  const tabla = req.params.tabla.toLowerCase() || "";
  const busqueda = req.params.busqueda;
  const regex = new RegExp(busqueda, "i");
  let results = [];

  switch (tabla) {
    case "usuarios":
      results = await Usuario.find({ name: regex }).populate(
        "usuario",
        "name img"
      );
      break;

    case "hospitales":
      results = await Hospital.find({ name: regex })
        .populate("usuario", "name img")
        .populate("hospital", "name img");
      break;

    case "medicos":
      results = await Medico.find({ name: regex }).populate(
        "usuario",
        "name img"
      );
      break;

    default:
      res.status(400).json({
        ok: false,
        resultados: results,
        msg: "La tabla puede ser Usuarios / Hospitales / Medicos",
      });
      break;
  }

  res.json({
    ok: true,
    resultados: results,
  });
};

module.exports = {
  getTodo,
  getCollectionsDocs,
};
