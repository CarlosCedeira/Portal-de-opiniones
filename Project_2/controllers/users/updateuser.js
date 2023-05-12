const { generateError } = require("../../generateError");
const { queryUpdateUser } = require("../../db/updateuser");
const jwt = require("jsonwebtoken");
const { token } = require("morgan");

const updateUserController = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    console.log("req", req.auth);
    const { id } = req.auth.id;
    console.log("id:", id);

    if (!email || !password) {
      throw generateError("Email or password invalid", 404);
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
