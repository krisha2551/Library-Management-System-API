import Fine from "../models/Fine.js";
import HttpError from "../middleware/HttpError.js";


// STUDENT OWN FINES
const getMyFines = async (req, res, next) => {
  try {
    const fines = await Fine.find({
      studentId: req.user._id,
    }).populate("bookId");

    res.status(200).json({
      success: true,
      fines,
    });
  } catch (error) {
    next(error);
  }
};


// ADMIN ALL FINES
const getAllFines = async (req, res, next) => {
  try {
    const fines = await Fine.find()
      .populate("studentId")
      .populate("bookId");

    res.status(200).json({
      success: true,
      fines,
    });
  } catch (error) {
    next(error);
  }
};


// MARK FINE PAID
const payFine = async (req, res, next) => {
  try {
    const fine = await Fine.findById(req.params.id);

    if (!fine) {
      throw new HttpError("Fine not found", 404);
    }

    fine.status = "paid";
    fine.paidAt = new Date();

    await fine.save();

    res.status(200).json({
      success: true,
      message: "Fine paid successfully",
      fine,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  getMyFines,
  getAllFines,
  payFine,
};