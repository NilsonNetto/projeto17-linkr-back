import { findUser, showPageUser } from "../controllers/usersControllers.js";
import express from "express";

const router = express.Router();

router.get("/user/:id", showPageUser);
router.get("/timeline/:name", findUser);

export default router;
