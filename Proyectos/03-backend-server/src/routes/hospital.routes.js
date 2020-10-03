/* 
    Ruta: '/api/hospitales'
*/

const router = require("express").Router();
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos.middle");
const { validateJWT } = require("../middlewares/validar-jwt.middle");
const controller = require("../controllers/hospital.controller");

router.get("/", validateJWT, controller.getHospitales);
router.post(
  "/create",
  validateJWT,
  [check("name", "El nombre del hospital es necesario").notEmpty()],
  validarCampos,
  controller.createHospital
);
router.put(
  "/update/:id",
  validateJWT,
  [check("name", "El nombre del hospital es necesario").notEmpty()],
  validarCampos,
  controller.updateHospital
);
router.delete("/delete/:id", validateJWT, controller.deleteHospital);

module.exports = router;
