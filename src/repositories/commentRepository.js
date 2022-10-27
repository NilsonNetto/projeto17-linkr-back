import connection from "../db/db.js";

function insertNewComment({ comment, postId, userId }) {
  return connection.query(
    `INSERT INTO comments ("postId", "userId", comment) VALUES ($1, $2, $3);`,
    [postId, userId, comment]
  );
}

function getCommentsById({ postId, userId }) {
  return connection.query(
    `
	SELECT 
	DISTINCT C.*, 
	U.username AS "commentUser",
	U."profilePicture",

	CASE WHEN (C."userId" = $1) 
	THEN TRUE 
	ELSE FALSE
	END AS "authorPost"
	
	FROM comments C
	JOIN users U ON U.id = C."userId"
	LEFT JOIN followers F ON F."idFollower" = C."userId"
	WHERE C."postId" = $2;`,
    [userId, postId]
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

export { insertNewComment, getCommentsById, getFollowers };
