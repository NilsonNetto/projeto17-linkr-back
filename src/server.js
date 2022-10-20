import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "../src/routes/authRoutes.js";
import userRoutes from "../src/routes/userRoutes.js";
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use(authRoutes);
app.use(userRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
