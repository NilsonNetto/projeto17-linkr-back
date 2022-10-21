import { editPostSchema } from "../schemas/editPostSchema.js";

function validateNewPost(req, res, next) {
  const validationNewPost = editPostSchema.validate(req.body, {
    abortEarly: false,
  });

  if (validationNewPost.error) {
    const errors = validationNewPost.error.details.map(
      (detail) => detail.message
    );
    return res.status(422).send(errors);
  }
  next();
}

export { validateNewPost };
