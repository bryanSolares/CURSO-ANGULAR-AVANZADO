/* 
    Ruta: '/api/medico'
*/

const router = require("express").Router();
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos.middle");
const { validateJWT } = require("../middlewares/validar-jwt.middle");
const medicoCtrl = require("../controllers/medico.controller");

router.get("/", validateJWT, medicoCtrl.getMedicos);
router.post(
  "/create",
  validateJWT,
  [
    check("name", "El nombre es requerido").notEmpty(),
    check("hospital", "El hospital es requerido").notEmpty(),
    check("hospital", "El hospital debe ser válido").isMongoId(),
  ],
  validarCampos,
  medicoCtrl.createMedico
);
router.put(
  "/update/:id",
  validateJWT,
  [
    check("name", "El nombre es requerido").notEmpty(),
    check("hospital", "El hospital es requerido").notEmpty(),
  ],
  validarCampos,
  medicoCtrl.updateMedico
);
router.delete("/delete/:id", validateJWT, medicoCtrl.deleteMedico);

module.exports = router;
