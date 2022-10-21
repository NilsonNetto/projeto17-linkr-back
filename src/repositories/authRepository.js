import connection from "../db/db.js";

async function insertUser ({email, cryptoPassword, username, profilePicture}) {
    const result = await connection.query(`
        INSERT INTO users (email, password, username, "profilePicture") VALUES ($1, $2, $3, $4);
    `, [email, cryptoPassword, username, profilePicture]);
    return result;
}

async function getUserByEmail ({email}) {
    return connection.query(`
        SELECT * FROM users WHERE email = $1;
    `, [email]);
}

async function getUserByUsername ({username}) {
    return connection.query(`
        SELECT * FROM users WHERE username = $1;
    `, [username]);
}

async function insertSessions ({userId, token}) {
    const result = await connection.query(`
        INSERT INTO sessions ("userId", token) VALUES ($1, $2);
    `, [userId, token]);
    return result;
}

async function getUserById ({userId}) {
    return connection.query(`
        SELECT * FROM users WHERE id = $1;
    `, [userId]);
}

export { insertUser, getUserByEmail, getUserByUsername, insertSessions, getUserById };