import User from "../models/User.js";
import HttpError from "../middleware/HttpError.js";


// REGISTER
const register = async (req, res, next) => {
  try {
    const { name, email, password, role, studentId, department, semester, phone } = req.body;

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
    });

    const token = await user.generateAuthToken();

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user,
      token,
    });
  } catch (error) {
    next(error);
  }
};


// LOGIN
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findByCredentials(email, password);

    const token = await user.generateAuthToken();

    res.status(200).json({
      success: true,
      message: "Login successful",
      user,
      token,
    });
  } catch (error) {
    next(error);
  }
};


// PROFILE
const getProfile = async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      user: req.user,
    });
  } catch (error) {
    next(error);
  }
};


// LOGOUT
const logout = async (req, res, next) => {
  try {
    req.user.tokens = req.user.tokens.filter(
      (tokenObj) => tokenObj.token !== req.token
    );

    await req.user.save();

    res.status(200).json({
      success: true,
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