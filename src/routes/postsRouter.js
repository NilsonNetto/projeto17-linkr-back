import express from "express";
import { publishPost, getPosts } from "./../controllers/postsControllers.js";
import { validateToken } from "./../middleware/validateTokenMiddleware.js";

const postsRouter = express.Router();

postsRouter.post("/publish", validateToken, publishPost);
postsRouter.get("/timeline", validateToken, getPosts);

export default postsRouter;
