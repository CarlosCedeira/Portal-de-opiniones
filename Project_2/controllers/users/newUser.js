const { generateError } = require("../../generateError");
const { queryNewUser } = require("../../db/createUser");

const newUserControler = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    // Añadir npm JOI para validar email y password
    if (!email || !password) {
      throw generateError("Email or password invalid", 404);
    }

    const id = await queryNewUser(email, password);

    res.send({
      status: "ok",
      message: `User created with id: ${id}`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  newUserControler,
};
