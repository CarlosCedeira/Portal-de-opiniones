const mysql = require("mysql2/promise");
require("dotenv").config({ path: "../.env" });
const { HOST, DBUSER, DATABASE } = process.env;

let pool;

const getConnection = async () => {
  if (!pool) {
    pool = mysql.createPool({
      connectionLimit: 10,
      host: HOST,
      user: DBUSER,
      database: DATABASE,

      timezone: "Z",
    });
  }

  return await pool.getConnection();
};
module.exports = { getConnection };
