/* 
    Ruta: '/api/todo'
*/

const router = require("express").Router();
const { validateJWT } = require("../middlewares/validar-jwt.middle");
const controller = require("../controllers/busquedas.controller");

router.get("/:busqueda?", validateJWT, controller.getTodo);
router.get(
  "/collection/:tabla/:busqueda?",
  validateJWT,
  controller.getCollectionsDocs
);

module.exports = router;
