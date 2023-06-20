const { generateError } = require("../../generateError");
const { queryPosLike } = require("../queryOpinions/queryLikeOpinions");

const postLikeController = async (req, res, next) => {
  try {
    const { eventoId } = req.body;
    const { id } = req.auth.id;
    console.log("idopinion controlador", eventoId);
    console.log("id user controlador", id);

    await queryPosLike(eventoId, id);

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
