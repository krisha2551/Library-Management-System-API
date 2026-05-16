import HttpError from "./HttpError.js";

const checkRole = (...roles) => {
  return (req, res, next) => {
    try {
      if (!roles.includes(req.user.role)) {
        throw new HttpError("Access denied", 403);
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};

export default checkRole;