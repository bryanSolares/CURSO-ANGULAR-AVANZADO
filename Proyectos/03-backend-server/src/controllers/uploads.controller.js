const { response } = require("express");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const fs = require("fs");
const helperImg = require("../helpers/update-img.helpers");

const fileUpload = (req, res = response) => {
  const { tipo, id } = req.params;
  const tiposValidos = ["hospitales", "medicos", "usuarios"];

  if (!tiposValidos.includes(tipo)) {
    return res.status(400).json({
      ok: false,
      msg: "El tipo proporcionado no del tipo: Hospitales | Médicos | Usuarios",
    });
  }

  // todo Valida que exista archivo
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({
      ok: false,
      msg: "No files were uploaded.",
    });
  }

  const file = req.files.img;
  const separacion = file.name.split(".");
  const extencion = separacion[separacion.length - 1];

  if (!["png", "jpg", "jpeg", "gif"].includes(extencion)) {
    return res.status(400).json({
      ok: false,
      msg: "No es una extencion válida.",
    });
  }

  const nameFile = `${uuidv4()}.${extencion}`;
  const path = `./src/uploads/${tipo}/${nameFile}`;

  file.mv(path, (err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        ok: false,
        msg: "Error al mover la imagen",
      });
    }

    helperImg.updateImg(tipo, id, nameFile);

    res.json({
      ok: true,
      msg: "Archivo almacenado Correctamente",
    });
  });
};

const getImage = (req, res = response) => {
  const { tipo, img } = req.params;
  const pathImage = path.join(__dirname, `../uploads/${tipo}/${img}`);
  const defaultImg = path.join(__dirname, `../uploads/no-image-found.png`);

  if (fs.existsSync(pathImage)) return res.sendFile(pathImage);

  res.sendFile(defaultImg);
};

module.exports = {
  fileUpload,
  getImage,
};
