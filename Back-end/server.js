require("dotenv").config();
const morgan = require("morgan");

const { connectCreate } = require("./db/stardDB");
connectCreate();
const { newUserController } = require("./controllers/users/newUser");
const { updateUserController } = require("./controllers/users/updateuser");
const { newOpinionController } = require("./controllers/opinions/newOpinion");
const { getOpinionController } = require("./controllers/opinions/getOpinion");
const {
  deleteOpinionController,
} = require("./controllers/opinions/deleteOpinions");
const { userLogin } = require("./controllers/users/loginController");
const { authUser } = require("./middlewares/auth");
//const { connectCreate } = require("./db/stardDB");

const express = require("express");
const app = express();
const cors = require("cors");

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

app.post("/", newUserController);
app.post("/user", userLogin);
app.put("/user", authUser, updateUserController);

app.post("/opinion", authUser, newOpinionController);
app.get("/opinion", getOpinionController);
app.delete("/opinion", authUser, deleteOpinionController);
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