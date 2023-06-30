import express from "express";
import router from "./routes/index.js";
import db from "./config/db.js";

const app = express();

// conectar a la base de datos
db.authenticate()
  .then(() => console.log("Base de datos conectada"))
  .catch((error) => console.log(error));

// definir el puerto
const port = process.env.PORT || 4000;

//hablitar pug
app.set("view engine", "pug");

// obtener el ano actual
app.use((req, res, next) => {
  const year = new Date();
  res.locals.actualYear = year.getFullYear();
  res.locals.nombresitio = "Agencia de Viaje ";
  next();
});

//agregar un body parser para leer los datos del formulario
app.use(express.urlencoded({ extended: true }));

//definir la carpeta public
app.use(express.static("public"));

// agregar router
app.use("/", router);

app.listen(port, () => {
  console.log(`El servidor esta funcionando en el puerto ${port}`);
});
