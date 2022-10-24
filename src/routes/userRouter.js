import { findUser, showPageUser } from "../controllers/usersControllers.js";
import express from "express";
import { validateToken } from "../middleware/validateTokenMiddleware.js";

const router = express.Router();

router.get("/user/:id", validateToken, showPageUser);
router.get("/users/:name", validateToken, findUser);

export default router;
