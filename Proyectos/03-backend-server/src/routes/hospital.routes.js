/* 
    Ruta: '/api/hospitales'
*/

const router = require("express").Router();
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos.middle");
const { validateJWT } = require("../middlewares/validar-jwt.middle");
const hospialCtrl = require("../controllers/hospital.controller");

router.get("/", validateJWT, hospialCtrl.getHospitales);
router.post(
  "/create",
  validateJWT,
  [check("name", "El nombre del hospital es necesario").notEmpty()],
  validarCampos,
  hospialCtrl.createHospital
);
router.put(
  "/update/:id",
  validateJWT,
  [check("name", "El nombre del hospital es necesario").notEmpty()],
  validarCampos,
  hospialCtrl.updateHospital
);
router.delete("/delete/:id", validateJWT, hospialCtrl.deleteHospital);

module.exports = router;
