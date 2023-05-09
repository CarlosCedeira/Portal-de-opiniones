const { generateError } = require("../../generateError");
const { queryUpdateUser } = require("../../db/updateuser");

const updateUserControler = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    // Añadir npm JOI para validar email y password
    if (!email || !password) {
      throw generateError("Email or password invalid", 404);
    }

    const id = await queryUpdateUser(username, email, password);

    res.send({
      status: "ok",
      message: `User succesfully updated`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  updateUserControler,
};
