/* 
    Ruta: '/api/medico'
*/

const router = require("express").Router();
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos.middle");
const { validateJWT } = require("../middlewares/validar-jwt.middle");
const medicoCtrl = require("../controllers/medico.controller");

router.get("/", validateJWT, medicoCtrl.getMedicos);
router.post("/create", [], validarCampos, medicoCtrl.createMedico);
router.put(
  "/update/:id",
  validateJWT,
  [],
  validarCampos,
  medicoCtrl.updateMedico
);
router.delete("/delete/:id", validateJWT, medicoCtrl.deleteMedico);

module.exports = router;
