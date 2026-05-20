import jwt from "jsonwebtoken";
import User from "../models/user.js";
import HttpError from "./HttpError.js";

const auth = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");

    if (!authHeader) {
      throw new HttpError("Authentication required", 401);
    }

    if (!authHeader.startsWith("Bearer ")) {
      throw new HttpError("Invalid authorization format", 401);
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });

    if (!user) {
      throw new HttpError("Invalid token", 401);
    }

    req.token = token;
    req.user = user;

    next();
  } catch (error) {
    console.log("AUTH ERROR:", error.message);

    if (
      error.name === "JsonWebTokenError" ||
      error.name === "TokenExpiredError"
    ) {
      return next(new HttpError("Invalid or expired token", 401));
    }

    next(error);
  }
};

export default auth;