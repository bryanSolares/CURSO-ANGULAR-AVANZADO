const express = require("express");
const cors = require("cors");
const app = express();
const morgan = require("morgan");
const fileUpload = require("express-fileupload");
const path = require("path");
require("dotenv").config();
require("./database/config");

app.use(express.static(path.join(__dirname, "public")));

app.use(cors());
app.use(morgan("tiny"));
app.use(fileUpload());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(require("./routes/index.routes"));
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/usuarios", require("./routes/usuario.routes"));
app.use("/api/hospitales", require("./routes/hospital.routes"));
app.use("/api/medicos", require("./routes/medico.routes"));
app.use("/api/todo", require("./routes/busqueda.routes"));
app.use("/api/uploads", require("./routes/upload.routes"));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.listen(process.env.PORT, () => {
  console.log(`Aplicación en puerto ${process.env.PORT}`);
});
