/* 
    Ruta: '/api/todo'
*/

const router = require("express").Router();
const { validateJWT } = require("../middlewares/validar-jwt.middle");
const busquedaCtrl = require("../controllers/busquedas.controller");

router.get("/:busqueda?", validateJWT, busquedaCtrl.getTodo);
router.get(
  "/collection/:tabla/:busqueda?",
  validateJWT,
  busquedaCtrl.getCollectionsDocs
);

module.exports = router;
