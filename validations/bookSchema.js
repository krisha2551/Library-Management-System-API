import Joi from "joi";

const bookSchema = Joi.object({
  title: Joi.string().trim(),

  author: Joi.string().trim(),

  category: Joi.string().trim(),

  isbn: Joi.string().trim(),

  description: Joi.string().trim(),

  totalCopies: Joi.number().min(1),

  availableCopies: Joi.number().min(0),
});

export const createBookSchema = bookSchema.fork(
  ["title", "author", "category", "isbn", "totalCopies"],
  (field) =>
    field.required().messages({
      "any.required": "{#label} is required",
    })
);

export const updateBookSchema = bookSchema
  .fork(
    [
      "title",
      "author",
      "category",
      "isbn",
      "description",
      "totalCopies",
      "availableCopies",
    ],
    (field) => field.optional()
  )
  .or(
    "title",
    "author",
    "category",
    "isbn",
    "description",
    "totalCopies",
    "availableCopies"
  );