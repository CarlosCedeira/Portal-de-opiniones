const { generateError } = require("../../generateError");
const { queryViewOpinion } = require("../queryOpinions/queryviewOpions");

const getOpinionControler = async (req, res, next) => {
  try {
    const id = await queryViewOpinion();

    res.send({
      status: "ok",
      message: `your opinion was succesfully posted: ${id}`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getOpinionControler,
};
