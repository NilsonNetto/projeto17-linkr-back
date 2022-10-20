import connection from "../db/db.js";

const searchPageUser = async (id) => {
  const pageUser = (
    await connection.query(`SELECT * FROM users WHERE id=$1`, [id])
  ).rows[0];
  return pageUser;
};

export { searchPageUser };
