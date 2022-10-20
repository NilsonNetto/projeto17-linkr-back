import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import likesRoutes from "./routes/likesRoutes.js";
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use(authRoutes);
app.use(likesRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});