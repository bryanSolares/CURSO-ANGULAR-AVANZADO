/* 
    Ruta: '/api/uploads'
*/

const router = require("express").Router();
const { validateJWT } = require("../middlewares/validar-jwt.middle");
const uploadCtrl = require("../controllers/uploads.controller");

router.put("/:tipo/:id", validateJWT, uploadCtrl.fileUpload);
router.get("/:tipo/:img", uploadCtrl.getImage);

module.exports = router;
