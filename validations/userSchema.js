import Joi from "joi";

const userSchema = Joi.object({
  name: Joi.string()
    .trim()
    .min(3)
    .messages({
      "string.base": "Name must be in string format",
      "string.empty": "Name is required",
      "string.min": "Name must be at least 3 characters",
    }),

  email: Joi.string()
    .trim()
    .email()
    .messages({
      "string.email": "Enter a valid email",
      "string.empty": "Email is required",
    }),

  password: Joi.string()
    .pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@#$%^&*!]{6,}$/)
    .messages({
      "string.pattern.base":
        "Password must be at least 6 characters and include letters and numbers",
      "string.empty": "Password is required",
    }),

  role: Joi.string()
    .valid("admin", "student")
    .optional(),

  studentId: Joi.string().trim(),

  department: Joi.string().trim(),

  semester: Joi.number(),

  phone: Joi.string()
    .trim()
    .pattern(/^[0-9]{10}$/)
    .messages({
      "string.pattern.base": "Phone must be exactly 10 digits",
    }),
});

export const createUserSchema = userSchema.fork(
  ["name", "email", "password"],
  (field) =>
    field.required().messages({
      "any.required": "{#label} is required",
    })
);

export const loginSchema = Joi.object({
  email: Joi.string()
    .trim()
    .email()
    .required(),

  password: Joi.string()
    .required(),
});