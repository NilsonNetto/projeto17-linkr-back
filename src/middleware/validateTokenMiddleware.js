import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

import { serverErrorResponse } from "../controllers/controllerHelper.js";

async function validateToken(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");

  const secretKey = process.env.TOKEN_SECRET;
  try {
    const verifyToken = jwt.verify(token, secretKey);
    res.locals.userId = verifyToken.userId;
  } catch (error) {
    serverErrorResponse(res, error);
  }
  next();
}

export { validateToken };
