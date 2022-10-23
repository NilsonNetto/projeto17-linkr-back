import { findUser, showPageUser } from "../controllers/usersControllers.js";
import express from "express";
import { userLogged } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/user/:id", userLogged, showPageUser);
router.get("/timeline/:name", userLogged, findUser);

export default router;
