const mysql = require("mysql2/promise");

const { HOST, USER, DATABASE } = process.env;

let pool;

const getConnection = async () => {
  if (!pool) {
    pool = mysql.createPool({
      connectionLimit: 10,
      host: HOST,
      user: USER,
      database: DATABASE,
      timezone: "Z",
    });
  }
  console.log("ese");
  return await pool.getConnection();
};
module.exports = { getConnection };
