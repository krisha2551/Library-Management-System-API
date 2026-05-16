import HttpError from "../middleware/HttpError.js";

const validate = (schema) => (req, res, next) => {
  try {
    const { value, error } = schema.validate(req.body, {
      abortEarly: false,
      allowUnknown: false,
      stripUnknown: true,
    });

    if (error) {
      return next(new HttpError(error.details[0].message, 400));
    }

    req.body = value;
    next();

  } catch (error) {
    throw new Error(error.message);
  }
};

export default validate;