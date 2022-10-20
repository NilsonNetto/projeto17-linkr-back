import { showPageUser } from "../controllers/usersControllers.js";
import express from "express";

const router = express.Router();

router.get("/user/:id ", showPageUser);

export default router;
