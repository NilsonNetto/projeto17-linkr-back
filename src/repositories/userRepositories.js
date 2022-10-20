import connection from "../db/db.js";

const searchPageUser = async () => {
  return connection.query(`SELECT * FROM users WHERE id=$1`, [id]).rows[0];
};

export { searchPageUser };
