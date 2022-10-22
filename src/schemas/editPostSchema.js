import joi from "joi";

const editPostSchema = joi.object({
  newPost: joi.string().required().min(0).max(300),
  postId: joi.number().required(),
});

export { editPostSchema };
