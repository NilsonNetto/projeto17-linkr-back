import { commentSchema } from "../schemas/commentSchema.js";

function validateNewComment(req, res, next) {
  const validationComment = commentSchema.validate(req.body, {
    abortEarly: false,
  });

  if (validationComment.error) {
    const errors = validationComment.error.details.map(
      (detail) => detail.message
    );
    return res.status(422).send(errors);
  }
  next();
}

export { validateNewComment };
