import jwt from "jsonwebtoken";
import User from "../models/User.js";
import HttpError from "./HttpError.js";

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      throw new HttpError("Access denied. No token provided", 401);
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      throw new HttpError("User not found", 404);
    }

    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};

export default auth;