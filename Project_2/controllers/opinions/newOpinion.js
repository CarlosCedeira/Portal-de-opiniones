const { generateError } = require("../../generateError");
const { queryNewOpinion } = require("../queryOpinions/QuerynewOpinion");

const newOpinionController = async (req, res, next) => {
  try {
    const { titulo, text } = req.body;
    const { id } = req.auth.id;

    // Añadir npm JOI para validar email y password
    if (!text || !titulo) {
      throw generateError("Insert a valid opinion", 404);
    }

    const newOpinionText = await queryNewOpinion(id, titulo, text);

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
