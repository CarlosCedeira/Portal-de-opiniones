const { getConnection } = require("../../db/db");
const { generateError } = require("../../generateError");

const queryPosLike = async (idOpinion) => {
  console.log("idopinion query", idOpinion);
  let connection;
  try {
    // Crearon query para la opinion nueva
    connection = await getConnection();
    // Comprobar que no exista otro usuario con ese email
    const [like] = await connection.query(
      `UPDATE opinions SET cantidad_likes = cantidad_likes + 1 WHERE id = ?`,
      [idOpinion]
    );
    console.log("respuesta query", like);

    /*if (like.length > 0) {
      throw generateError("User exist", 409);
    }*/
  } finally {
    if (connection) connection.release();
  }
};

module.exports = { queryPosLike };
