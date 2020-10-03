/* 
    Ruta: '/api/auth'
*/

const router = require("express").Router();
const { check } = require("express-validator");
const controller = require("../controllers/auth.controller");
const { validarCampos } = require("../middlewares/validar-campos.middle");
const { validateJWT } = require("../middlewares/validar-jwt.middle");

router.post(
  "/login",
  [
    check("email", "Email required").isEmail(),
    check("password", "Password required").notEmpty(),
  ],
  validarCampos,
  controller.login
);

router.post(
  "/google/login",
  [check("token", "El token de google es obligatorio").notEmpty()],
  validarCampos,
  controller.googleSignIn
);

router.get("/renew", validateJWT, controller.renewToken);

module.exports = router;
