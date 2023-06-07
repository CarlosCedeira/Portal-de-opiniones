const { getConnection } = require("../../db/db");
const { generateError } = require("../../generateError");

const queryViewOpinion = async () => {
  let connection;
  try {
    connection = await getConnection();

    const [user] = await connection.query(`SELECT titulo, text FROM opinions`);
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
