const { getConnection } = require("../db/db");
const { generateError } = require("../generateError");
const bcrypt = require("bcrypt");

const queryLogin = async (username, email, password) => {
  let connection;
  try {
    // Crearon query para la opinion nueva

    //const passwordHash = await bcrypt.hash(password, 10);
    //console.log(passwordHash);
    connection = await getConnection();
    // Comprobar que no exista otro usuario con ese email
    const [user] = await connection.query(
      `SELECT * FROM users WHERE user_name = ? AND email = ?`,
      [username, email]
    );

    /*if (user.length > 0) {
      throw generateError("User exist ", 409);
    }*/
    //console.log(user[0].username);
    return user;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = { queryLogin };
