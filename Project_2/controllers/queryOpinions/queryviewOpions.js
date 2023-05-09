const { getConnection } = require("../../db/db");
const { generateError } = require("../../generateError");

const queryViewOpinion = async () => {
  let connection;
  try {
    // Crearon query para la opinion nueva
    connection = await getConnection();
    // Comprobar que no exista otro usuario con ese email
    const [user] = await connection.query(`SELECT text FROM opinions`);

    /*if (user.length > 0) {
      throw generateError("User exist ", 409);
    }*/
    return user;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = { queryViewOpinion };
