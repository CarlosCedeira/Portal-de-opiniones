const { getConnection } = require("../../db/db");
const { generateError } = require("../../generateError");

const queryViewOpinion = async () => {
  let connection;
  try {
    connection = await getConnection();

    const [user] = await connection.query(`SELECT titulo, text FROM opinions`);
    if (Object.keys(user).length === 0) {
      throw generateError("Sorry does not have opinions ", 409);
    }
    montarQuery = `${user[0].titulo}: ${user[0].text}`;
    return montarQuery;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = { queryViewOpinion };
