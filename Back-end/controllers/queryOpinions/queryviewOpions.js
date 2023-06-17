const { getConnection } = require("../../db/db");
const { generateError } = require("../../generateError");

const queryViewOpinion = async () => {
  let connection;
  try {
    connection = await getConnection();

    const [user] = await connection.query(
      `SELECT opinions.id, users.user_name, opinions.user_id, opinions.titulo, opinions.text,opinions.cantidad_likes, opinions.created_at
      FROM users
      JOIN opinions ON users.id = opinions.user_id`
      //`SELECT titulo, text, created_at FROM opinions`
    );
    let todasLasOpiniones = [];
    for (let i = 0; i < user.length; i++) {
      todasLasOpiniones.push(user[i]);
    }

    if (Object.keys(user).length === 0) {
      throw generateError("Sorry does not have opinions ", 409);
    }

    return todasLasOpiniones;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = { queryViewOpinion };
