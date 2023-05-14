const { generateError } = require("../../generateError");
const { queryUpdateUser } = require("../../db/updateuser");
const { validarEmail } = require("../../ValidacionJOI");
const jwt = require("jsonwebtoken");
const { token } = require("morgan");

const updateUserController = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const { id } = req.auth.id;

    if (!email || !password) {
      throw generateError("Email or password invalid", 404);
    }

    const esValido = await validarEmail(email);
    if (!esValido) {
      throw generateError("invalid email format", 404);
    }

    await queryUpdateUser(username, email, password, id);

    res.send({
      status: "ok",
      message: `User details succesfully updated`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  updateUserController,
};
