const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateError } = require("../../generateError");
const { queryLogin } = require("../../db/userLogin");
const { validarEmail } = require("../../ValidacionJOI");

const userLogin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const esValido = await validarEmail(email);
    if (!esValido) {
      throw generateError("invalid email format", 404);
    }

    const name2 = await queryLogin(email);
    const validpassword = await bcrypt.compare(password, name2.password);
    if (!validpassword) {
      throw generateError("password does not match", 401);
    }

    const payload = { id: name2 };

    const token = jwt.sign(payload, process.env.SECRET, {
      expiresIn: "30d",
    });

    res.send({
      status: "ok",
      data: token,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  userLogin,
};
