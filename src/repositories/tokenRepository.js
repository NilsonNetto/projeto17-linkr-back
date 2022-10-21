import connection from "../db/db.js";

async function validateTokenRepository(token, userId) {
  return connection.query(
    `SELECT * FROM sessions WHERE token = $1 AND valid AND "userId" = $2;`,
    [token, userId]
  );
}

export { validateTokenRepository };
