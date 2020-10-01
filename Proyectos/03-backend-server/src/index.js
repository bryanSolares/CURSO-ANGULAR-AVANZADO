const express = require("express");
const cors = require("cors");
const app = express();
const routerMain = require("./routes/index");
require("dotenv").config();
require("./database/config");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(routerMain);
app.use("/api/usuarios", require("./routes/usuario.routes"));
app.use("/api/auth", require("./routes/auth.routes"));

app.listen(process.env.PORT, () => {
  console.log(`Aplicación en puerto ${process.env.PORT}`);
});
