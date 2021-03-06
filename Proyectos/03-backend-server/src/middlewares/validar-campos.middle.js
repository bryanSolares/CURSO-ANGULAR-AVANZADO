const { response } = require("express");
const { validationResult } = require("express-validator");

const validarCampos = (req, res = response, next) => {
  console.log(req.body);

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      ok: false,
      msg: "Fields incomplete or exists Errors",
      errors: errors.mapped(),
    });
  }

  next();
};

module.exports = {
  validarCampos,
};
