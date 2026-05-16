import jwt from "jsonwebtoken";
import User from "../models/User.js";
import HttpError from "./HttpError.js";

const auth = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new HttpError("Authentication required", 401);
    }

    const token = authHeader.replace("Bearer ", "");

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
    next(error);
  }
};

export default auth;