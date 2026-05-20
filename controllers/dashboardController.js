import User from "../models/user.js";
import Book from "../models/Book.js";
import Borrow from "../models/Borrow.js";
import Fine from "../models/Fine.js";

const adminDashboard = async (req, res, next) => {
  try {
    const totalStudents = await User.countDocuments({
      role: "student",
    });

    const totalBooks = await Book.countDocuments();

    const borrowedBooks = await Borrow.countDocuments({
      status: "borrowed",
    });

    const overdueBooks = await Borrow.countDocuments({
      status: "borrowed",
      dueDate: { $lt: new Date() },
    });

    const totalFines = await Fine.aggregate([
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$amount" },
        },
      },
    ]);

    res.status(200).json({
      totalStudents,
      totalBooks,
      borrowedBooks,
      overdueBooks,
      totalFines: totalFines[0]?.totalAmount || 0,
    });
  } catch (error) {
    next(error);
  }
};


const studentDashboard = async (req, res, next) => {
  try {
    const borrowedBooks = await Borrow.countDocuments({
      studentId: req.user._id,
      status: "borrowed",
    });

    const dueBooks = await Borrow.countDocuments({
      studentId: req.user._id,
      status: "borrowed",
      dueDate: { $lt: new Date() },
    });

    const pendingFines = await Fine.aggregate([
      {
        $match: {
          studentId: req.user._id,
          status: "pending",
        },
      },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$amount" },
        },
      },
    ]);

    res.status(200).json({
      borrowedBooks,
      dueBooks,
      pendingFines: pendingFines[0]?.totalAmount || 0,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  adminDashboard,
  studentDashboard,
};