const { generateError } = require("../../generateError");
const { queryUpdateUser } = require("../../db/updateuser");

const updateUserController = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    // Añadir npm JOI para validar email y password
    if (!email || !password) {
      throw generateError("Email or password invalid", 404);
    }

    const id = await queryUpdateUser(username, email, password);

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
