const { generateError } = require("../../generateError");
const { queryPosLike } = require("../queryOpinions/queryLikeOpinions");

const postLikeController = async (req, res, next) => {
  try {
    const { idOpinion } = req.body;
    console.log("idopinion controlador", idOpinion);

    await queryPosLike(idOpinion);

    res.send({
      status: "ok",
      message: `your like was succesfully posted`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  postLikeController,
};
