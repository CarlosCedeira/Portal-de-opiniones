const { generateError } = require("../../generateError");
const { queryLogin } = require("../../db/userLogin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userLogin = async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    const name = await queryLogin(username, email, password);

    const validpassword = await bcrypt.compare(username, name);
    console.log(name);
    console.log(validpassword);
    if (validpassword) {
      throw generateError("password not match", 401);
    }

    const payload = { id: name };

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
