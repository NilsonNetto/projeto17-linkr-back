import { serverErrorResponse } from "../controllers/controllerHelper.js";
import { validateTokenRepository } from "../repositories/tokenRepository.js";

async function validateToken(req, res, next) {
  const { userId } = req.body;

  let token = req.headers.authorization;
  token = token.replace("Bearer ", "");

  try {
    const tokenRegistered = await validateTokenRepository(token, userId);
    if (tokenRegistered.rowCount === 0) {
      return res.status(400).send("Session invalid");
    }
  } catch (error) {
    serverErrorResponse(res, error);
  }

  next();
}

export { validateToken };