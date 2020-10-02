const fs = require("fs");
const Usuario = require("../models/usuario.model");
const Hospital = require("../models/hospital.model");
const Medico = require("../models/medico.model");

const updateImg = async (tipo, id, nameFile) => {
  switch (tipo) {
    case "usuarios":
      return processImg(Usuario, id, tipo, nameFile);
      break;

    case "hospitales":
      return processImg(Hospital, id, tipo, nameFile);
      break;

    case "medicos":
      return processImg(Medico, id, tipo, nameFile);

    default:
      res.status(400).json({
        ok: false,
        resultados: results,
        msg: "El tipo debe ser Usuarios / Hospitales / Medicos",
      });
      break;
  }
};

const processImg = async (table, id, folder, nameFile) => {
  const dataResult = await table.findById(id);
  if (!dataResult) {
    console.log(`No se encontro el elemento en la tabla`);
    return false;
  }

  const pathOld = `./src/uploads/${folder}/${dataResult.img}`;

  if (fs.existsSync(pathOld)) {
    fs.unlinkSync(pathOld);
  }

  dataResult.img = nameFile;
  await dataResult.save();
  return true;
};

module.exports = {
  updateImg,
};
