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
    .optional()
    .messages({
      "any.only": "Role must be admin or student",
    }),

  studentId: Joi.string()
    .trim()
    .messages({
      "string.base": "Student ID must be string",
    }),

  department: Joi.string()
    .trim()
    .messages({
      "string.base": "Department must be string",
    }),

  semester: Joi.number()
    .messages({
      "number.base": "Semester must be number",
    }),

  phone: Joi.string()
    .trim()
    .pattern(/^[0-9]{10}$/)
    .messages({
      "string.pattern.base": "Phone must be exactly 10 digits",
    }),
});


// CREATE USER
export const createUserSchema = userSchema.fork(
  ["name", "email", "password"],
  (field) =>
    field.required().messages({
      "any.required": "{#label} is required",
    })
);


// LOGIN
export const loginSchema = Joi.object({
  email: Joi.string()
    .trim()
    .email()
    .required()
    .messages({
      "string.email": "Enter a valid email",
      "any.required": "Email is required",
    }),

  password: Joi.string()
    .required()
    .messages({
      "any.required": "Password is required",
    }),
});


// UPDATE USER
export const updateUserSchema = userSchema
  .fork(
    [
      "name",
      "password",
      "studentId",
      "department",
      "semester",
      "phone",
    ],
    (field) => field.optional()
  )
  .fork(["email", "role"], (field) => field.forbidden())
  .or(
    "name",
    "password",
    "studentId",
    "department",
    "semester",
    "phone"
  )
  .messages({
    "object.missing": "At least one field is required for update",
  });