import Joi from "joi";

const fineSchema = Joi.object({
  fineId: Joi.string()
    .required()
    .messages({
      "any.required": "Fine ID is required",
      "string.empty": "Fine ID is required",
    }),
});

export { fineSchema };