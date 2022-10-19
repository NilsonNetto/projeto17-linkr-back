import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import hashtagsRouters from "./routers/hashtags.router.js";
import authRoutes from "../src/routes/authRoutes.js";
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use(authRoutes);
app.use(hashtagsRouters);

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});