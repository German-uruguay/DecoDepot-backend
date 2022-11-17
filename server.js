require("dotenv").config();
const cors = require("cors");
const express = require("express");
const routes = require("./routes");
const { dbInitialSetup } = require("./dbInitialSetup");
const APP_PORT = process.env.APP_PORT;
const app = express();
app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

routes(app);

<<<<<<< HEAD
// dbInitialSetup();
=======
//dbInitialSetup();
>>>>>>> 4dde9bfa51a2e2f33bc2b43575be1d3f955b6a42

app.listen(APP_PORT, () => {
  console.log(`\n[Express] Servidor corriendo en el puerto ${APP_PORT}.`);
  console.log(`[Express] Ingresar a http://localhost:${APP_PORT}.\n`);
});
