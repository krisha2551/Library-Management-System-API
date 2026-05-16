import Joi from "joi";

const bookSchema = Joi.object({
  title: Joi.string()
    .trim()
    .messages({
      "string.empty": "Book title is required",
    }),

  author: Joi.string()
    .trim()
    .messages({
      "string.empty": "Author name is required",
    }),

  category: Joi.string()
    .trim()
    .messages({
      "string.empty": "Category is required",
    }),

  isbn: Joi.string()
    .trim()
    .messages({
      "string.empty": "ISBN is required",
    }),

  description: Joi.string()
    .trim()
    .messages({
      "string.base": "Description must be string",
    }),

  totalCopies: Joi.number()
    .min(1)
    .messages({
      "number.base": "Total copies must be number",
      "number.min": "Total copies must be at least 1",
    }),

  availableCopies: Joi.number()
    .min(0)
    .messages({
      "number.base": "Available copies must be number",
      "number.min": "Available copies cannot be negative",
    }),
});


// CREATE BOOK
export const createBookSchema = bookSchema.fork(
  ["title", "author", "category", "isbn", "totalCopies"],
  (field) =>
    field.required().messages({
      "any.required": "{#label} is required",
    })
);


// UPDATE BOOK
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
  )
  .messages({
    "object.missing": "At least one field is required for update",
  });