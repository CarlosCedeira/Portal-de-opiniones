require("dotenv").config();

const { getConnection } = require("./db");

async function connectCreate() {
  let connection;
  try {
    console.log("eseeeeee");
    connection = await getConnection();
    /// Borramos la tabla si existe
    await connection.query(`DROP TABLE IF EXISTS opinions`);
    await connection.query(`DROP TABLE IF EXISTS users`);

    //Creamos tablas
    await connection.query(`CREATE TABLE users(
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_name VARCHAR(25) NOT NULL, 
  email VARCHAR(100) UNIQUE NOT NULL,
  pasword VARCHAR(100) NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP

);`);
    await connection.query(`CREATE TABLE opinions(
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL, 
  text TINYTEXT NOT NULL,
  image VARCHAR(100), 
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);`);
  } catch (error) {
    console.error(error);
  } finally {
    if (connection) connection.release();
    process.exit();
  }
}
connectCreate();
