import joi from "joi";

const commentSchema = joi.object({
  comment: joi.string().required().min(0).max(150),
  postId: joi.number().required(),
});

export { commentSchema };
