const { generateError } = require("../../generateError");
const { queryOpinionsLogin } = require("../queryOpinions/queryOpinionsLogin");

const getOpinionLoginController = async (req, res, next) => {
  try {
    const { id } = req.auth.id;
    console.log("opinionslogin controller", id);

    const likesDelUsuario = await queryOpinionsLogin(id);

    res.send({
      status: "ok",
      message: likesDelUsuario,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getOpinionLoginController,
};
