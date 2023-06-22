const { getConnection } = require("../../db/db");

const queryOpinionsLogin = async (id) => {
  console.log("id user query", id);
  let connection;
  try {
    // Crearon query para la opinion nueva
    connection = await getConnection();
    // Comprobar que no exista otro usuario con ese email
    const [userOpinion] = await connection.query(
      `SELECT DISTINCT opinions.id, users.user_name,
      opinions.user_id, opinions.titulo, opinions.text,
      opinions.cantidad_likes,
      opinions.created_at,
      likes.user_id AS id_usuario_like
      FROM users
      JOIN opinions ON users.id = opinions.user_id
      LEFT JOIN likes ON opinions.id = likes.opinion_id`
    );

    console.log("respuesta query base de datos", userOpinion);
    return userOpinion;

    /*if (like.length > 0) {
        throw generateError("User exist", 409);
      }*/
  } finally {
    if (connection) connection.release();
  }
};

module.exports = { queryOpinionsLogin };
