const router = require("express").Router();

router.get("/", (req, res) => {
  res.json({ ok: true, msg: "Conexión Exitosa" });
});

module.exports = router;
