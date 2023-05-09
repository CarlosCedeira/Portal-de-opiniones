const mysql = require("mysql2/promise");

const { HOST, USER, PASSWORD, DATABASE } = process.env;

let pool;

const getConnection = async () => {
  if (!pool) {
    pool = mysql.createPool({
      connectionLimit: 10,
      host: HOST,
      user: USER,
      password: PASSWORD,
      database: DATABASE,
      timezone: "Z",
    });
  }
  return await pool.getConnection();
};
module.exports = { getConnection };
