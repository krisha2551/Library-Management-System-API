import Joi from "joi";

const borrowSchema = Joi.object({
  bookId: Joi.string()
    .required()
    .messages({
      "any.required": "Book ID is required",
    }),
});

export { borrowSchema };