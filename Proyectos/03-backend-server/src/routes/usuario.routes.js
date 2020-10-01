/* 
    Ruta: '/api/usuarios'
*/

const router = require("express").Router();
const { check } = require("express-validator");
const usuarioCtrl = require("../controllers/usuario.controller");
const { validarCampos } = require("../middlewares/validar-campos.middle");
const { validateJWT } = require("../middlewares/validar-jwt.middle");

router.get("/", validateJWT, usuarioCtrl.getUsuarios);
router.post(
  "/create",
  [
    check("name", "Name required").notEmpty(),
    check("email", "Email required and valid").isEmail(),
    check("password", "Password required and Length min 5")
      .notEmpty()
      .isLength({ min: 5 }),
  ],
  validarCampos,
  usuarioCtrl.createUser
);
router.put(
  "/update/:id",
  validateJWT,
  [
    check("name", "Name required").notEmpty(),
    check("email", "Email required and valid").isEmail(),
    check("role", "Role required").notEmpty(),
  ],
  validarCampos,
  usuarioCtrl.updateUser
);
router.delete("/delete/:id", validateJWT, usuarioCtrl.deleteUser);

module.exports = router;
