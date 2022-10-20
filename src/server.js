import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "../src/routes/authRoutes.js";
import editPostRouter from "./routes/editPostRouter.js";
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use(authRoutes);
app.use(editPostRouter);

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});