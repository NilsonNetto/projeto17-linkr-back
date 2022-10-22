import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "../src/routes/userRoutes.js";
import postsRouter from "./routes/postsRouter.js";
import hashtagsRouters from "./routes/hashtagsRouter.js";
import likesRoutes from "./routes/likesRoutes.js";
import editPostRouter from "./routes/editPostRouter.js";
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());


app.use(authRoutes);
app.use(userRoutes);
app.use(postsRouter);
app.use(hashtagsRouters);
app.use(likesRoutes);
app.use(editPostRouter);


app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
