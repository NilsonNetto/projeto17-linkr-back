import connection from "../db/db.js";

function insertNewComment({ comment, postId, userId }) {
  return connection.query(
    `INSERT INTO comments ("postId", "userId", comment) VALUES ($1, $2, $3);`,
    [postId, userId, comment]
  );
}

function getCommentsById(postId) {
  return connection.query(
    `
	SELECT 
	DISTINCT C.*, 
	U.username AS "commentUser",
	U."profilePicture"
	
	FROM comments C
	JOIN users U ON U.id = C."userId"
	LEFT JOIN followers F ON F."idFollower" = C."userId"
	WHERE C."postId" = $1;`,
    [postId]
  );
}

function getFollowers(userId) {
  return connection.query(
    `
	SELECT ARRAY (SELECT "idFollower" FROM followers WHERE "idFollowed" = $1) AS "idFollowers";
	`,
    [userId]
  );
}

function getAuthor(postId) {
	return connection.query(`SELECT "userId" FROM posts WHERE id = $1;`, [postId])
}

export { insertNewComment, getCommentsById, getFollowers, getAuthor };
