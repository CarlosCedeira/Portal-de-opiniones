const bcrypt = require("bcrypt");
const { getConnection } = require("./db");
const { generateError } = require("../generateError");

const queryUpdateUser = async (username, email, password, id) => {
  let connection;
  try {
    connection = await getConnection();
    // Comprobar que no exista otro usuario con ese email
    const [user] = await connection.query(`SELECT id FROM users WHERE id = ?`, [
      id,
    ]);
    if (!user[0]) {
      throw generateError("User does not exist ", 409);
    }
    // Encriptar la password
    const passwordEncript = await bcrypt.hash(password, 10);

    // Crearon query para el susuario nuevo
    const [newUserUpdate] = await connection.query(
      `UPDATE users SET user_name=?, email=?, password=? WHERE id = ?`,
      [username, email, passwordEncript, id]
    );
    return;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = { queryUpdateUser };
