const express = require("express");
const cors = require("cors");
const app = express();
const routes = require("./routes/index");
require("dotenv").config();
require("./database/config");

app.use(cors());
app.use(routes);

app.listen(process.env.PORT, () => {
  console.log(`Aplicación en puerto ${process.env.PORT}`);
});
