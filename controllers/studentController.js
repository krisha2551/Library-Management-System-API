import User from "../models/User.js";
import HttpError from "../middleware/HttpError.js";


// GET ALL STUDENTS
const getAllStudents = async (req, res, next) => {
  try {
    const students = await User.find({ role: "student" });

    res.status(200).json({
      success: true,
      students,
    });
  } catch (error) {
    next(error);
  }
};


// GET SINGLE STUDENT
const getStudentById = async (req, res, next) => {
  try {
    const student = await User.findOne({
      _id: req.params.id,
      role: "student",
    });

    if (!student) {
      throw new HttpError("Student not found", 404);
    }

    res.status(200).json({
      success: true,
      student,
    });
  } catch (error) {
    next(error);
  }
};


// UPDATE STUDENT
const updateStudent = async (req, res, next) => {
  try {
    const student = await User.findOneAndUpdate(
      {
        _id: req.params.id,
        role: "student",
      },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!student) {
      throw new HttpError("Student not found", 404);
    }

    res.status(200).json({
      success: true,
      message: "Student updated successfully",
      student,
    });
  } catch (error) {
    next(error);
  }
};


// DELETE STUDENT
const deleteStudent = async (req, res, next) => {
  try {
    const student = await User.findOneAndDelete({
      _id: req.params.id,
      role: "student",
    });

    if (!student) {
      throw new HttpError("Student not found", 404);
    }

    res.status(200).json({
      success: true,
      message: "Student deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export default {
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
};