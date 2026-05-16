import User from "../models/User.js";
import HttpError from "../middleware/HttpError.js";


const register = async (req, res, next) => {
  try {
    const {
      name,
      email,
      password,
      role,
      studentId,
      department,
      semester,
      phone,
    } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new HttpError("Email already exists", 400);
    }

    const user = await User.create({
      name,
      email,
      password,
      role,
      studentId,
      department,
      semester,
      phone,
      profileImage: req.file?.path,
    });

    const token = await user.generateAuthToken();

    res.status(201).json({
      message: "User registered successfully",
      user,
      token,
    });
  } catch (error) {
    next(error);
  }
};


const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findByCredentials(email, password);

    const token = await user.generateAuthToken();

    res.status(200).json({
      message: "Login successful",
      user,
      token,
    });
  } catch (error) {
    next(error);
  }
};


const getProfile = async (req, res, next) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    next(error);
  }
};


const logout = async (req, res, next) => {
  try {
    req.user.tokens = req.user.tokens.filter(
      (tokenObj) => tokenObj.token !== req.token
    );

    await req.user.save();

    res.status(200).json({
      message: "Logout successful",
    });
  } catch (error) {
    next(error);
  }
};

export default {
  register,
  login,
  getProfile,
  logout,
};