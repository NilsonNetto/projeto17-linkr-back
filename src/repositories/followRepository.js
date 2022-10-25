import connection from "../db/db.js";

const listFollow = async (followerId, followedId) => {
  return (connection.query(`
    SELECT id
    FROM followers f
    WHERE 
    f."idFollower" = $1 AND
    f."idFollowed" = $2;
    `, [followerId, followedId]));
};

const insertFollow = async (followerId, followedId) => {
  return (connection.query(`
  INSERT INTO followers
  ("idFollower", "idFollowed")
  VALUES 
  ($1,$2);
  `, [followerId, followedId]));
};

const deleteFollow = async (followId) => {
  return (connection.query(`
  DELETE FROM followers f
  WHERE
  f.id = $1;
  `, [followId]));
};


export { listFollow, insertFollow, deleteFollow };