const router = require("express").Router();
const { check } = require("express-validator");
const authCtrl = require("../controllers/auth.controller");
const { validarCampos } = require("../middlewares/validar-campos.middle");

router.post(
  "/login",
  [
    check("email", "Email required").isEmail(),
    check("password", "Password required").notEmpty(),
  ],
  validarCampos,
  authCtrl.login
);

module.exports = router;
