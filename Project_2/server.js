require("dotenv").config();
const morgan = require("morgan");

const { newUserControler } = require("./controllers/users/newUser");
const { updateUserControler } = require("./controllers/users/updateuser");
const { newOpinionControler } = require("./controllers/opinions/newOpinion");
const { getOpinionControler } = require("./controllers/opinions/getOpinion");
const { connectCreate } = require("./db/stardDB");

const express = require("express");
const app = express();

app.use(morgan("dev"));
app.use(express.json());

app.post("/user", newUserControler);
app.put("/user", updateUserControler);

app.post("/opinion", newOpinionControler);
app.get("/opinion", getOpinionControler);
// Middleware de 404

app.use((req, res) => {
  res.status(404).send({
    status: "error",
    message: "Not found",
  });
});

// Middleware de gestion de errores
app.use((error, req, res, next) => {
  console.error(error);

  res.status(error.httpStatus || 500).send({
    status: "error",
    message: error.message,
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Server is working in port: ${process.env.PORT}`);
});
