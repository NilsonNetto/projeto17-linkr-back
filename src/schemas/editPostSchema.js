import joi from "joi";

const editPostSchema = joi.object({
  userId: joi.number().required(),
  newPost: joi.string().required().min(0).max(300),
  postId: joi.number().required(),
});

export { editPostSchema };
