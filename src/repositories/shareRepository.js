import connection from "../db/db.js";

async function getRepostsInfo ({id}) {
    return connection.query(`
        SELECT posts."userId", users.id, posts.id AS "postId" FROM posts 
        JOIN users ON posts."userId"=users.id
        WHERE posts.id = $1;
    `, [id]);
}

async function getUserById ({userId}) {
    return connection.query(`
        SELECT id FROM users WHERE id = $1;
    `, [userId]);
}

async function insertRepost ({postId, id}) {
    const result = await connection.query(`
        INSERT INTO reposts ("postId", "userId") VALUES ($1, $2);
    `, [postId, id]);
    return result;
}

async function getPostInfo ({postId, id}) {
    return connection.query(`
        SELECT reposts.id AS "repostId", users.username, posts.* FROM reposts 
        JOIN users ON reposts."userId"=users.id 
        JOIN posts ON reposts."postId"=posts.id
        WHERE reposts."postId" = $1 AND reposts."userId" = $2 
        ORDER BY reposts.id DESC 
        LIMIT 1;
    `, [postId, id]);
}

async function getProfilePicture ({postId}) {
    return connection.query(`
        SELECT "profilePicture" FROM posts 
        JOIN users ON posts."userId"=users.id 
        WHERE posts.id = $1;
    `, [postId]);
}

async function getAllPostLikes ({postId}) {
    return connection.query(`
        SELECT COUNT(likes.id) AS likes FROM likes WHERE "postId" = $1;
    `, [postId]);
}

async function getAllRepostsQTD ({postId}) {
    return connection.query(`
        SELECT COUNT(COALESCE(reposts.id, 0)) AS "repostsQTD" FROM reposts WHERE "postId" = $1;
    `, [postId]);
}

async function getAllPostComments ({postId}) {
    return connection.query(`
        SELECT COUNT(COALESCE(comments.id, 0)) AS comments FROM comments WHERE "postId" = $1;
    `, [postId]);
}

export {getRepostsInfo, getUserById, insertRepost, getPostInfo, getProfilePicture,
    getAllPostLikes, getAllRepostsQTD, getAllPostComments};