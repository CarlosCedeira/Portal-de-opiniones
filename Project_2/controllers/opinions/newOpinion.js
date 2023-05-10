const { generateError } = require("../../generateError");
const { queryNewOpinion } = require("../queryOpinions/QuerynewOpinion");

const newOpinionController = async (req, res, next) => {
  try {
    const { userId, text, image } = req.body;
    // Añadir npm JOI para validar email y password
    if (!text || !image) {
      throw generateError("Insert a valid opinion", 404);
    }

    const newOpinionText = await queryNewOpinion(userId, text, image);

    res.send({
      status: "ok",
      message: `your opinion was succesfully posted: ${newOpinionText}`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  newOpinionController,
};
