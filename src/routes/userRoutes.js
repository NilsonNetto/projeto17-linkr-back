import { findUser, showPageUser } from "../controllers/usersControllers.js";
import express from "express";
import { userLogged } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/user/:id", showPageUser);
router.get("/timeline/:name", findUser);

export default router;
