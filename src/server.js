import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRouter.js";
import userRoutes from "../src/routes/userRouter.js";
import postsRouter from "./routes/postsRouter.js";
import hashtagsRouters from "./routes/hashtagsRouter.js";
import likesRoutes from "./routes/likesRouter.js";
import followRouter from "./routes/followsRouter.js";
import editPostRouter from "./routes/editPostRouter.js";
import commentRouter from "./routes/commentRouter.js";
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());


app.use(authRoutes);
app.use(userRoutes);
app.use(postsRouter);
app.use(hashtagsRouters);
app.use(likesRoutes);
app.use(followRouter);
app.use(editPostRouter);
app.use(commentRouter)

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
