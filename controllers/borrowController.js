import Borrow from "../models/Borrow.js";
import Book from "../models/Book.js";
import Fine from "../models/Fine.js";
import HttpError from "../middleware/HttpError.js";
// import sendEmail from "../utils/sendEmail.js";
// import sendWhatsApp from "../utils/sendWhatsApp.js";

const borrowBook = async (req, res, next) => {
  try {
    const { bookId } = req.body;

    const book = await Book.findById(bookId);

    if (!book) {
      throw new HttpError("Book not found", 404);
    }

    if (book.availableCopies <= 0) {
      throw new HttpError("Book not available", 400);
    }

    const existingBorrow = await Borrow.findOne({
      studentId: req.user._id,
      bookId,
      status: "borrowed",
    });

    if (existingBorrow) {
      throw new HttpError("Book already borrowed", 400);
    }

    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + Number(process.env.BORROW_DAYS));

    const borrow = await Borrow.create({
      studentId: req.user._id,
      bookId,
      dueDate,
    });

    book.availableCopies -= 1;
    await book.save();

    // await sendEmail(
    //   req.user.email,
    //   "Book Borrowed Successfully",
    //   `<h2>You borrowed ${book.title}</h2><p>Return before ${dueDate}</p>`
    // );

    // if (req.user.phone) {
    //   await sendWhatsApp(
    //     req.user.phone,
    //     `You borrowed ${book.title}. Return before ${dueDate}`
    //   );
    // }

    res.status(201).json(borrow);
  } catch (error) {
    next(error);
  }
};


const returnBook = async (req, res, next) => {
  try {
    const { bookId } = req.body;

    const borrow = await Borrow.findOne({
      studentId: req.user._id,
      bookId,
      status: "borrowed",
    });

    if (!borrow) {
      throw new HttpError("Borrow record not found", 404);
    }

    const book = await Book.findById(bookId);

    borrow.returnDate = new Date();
    borrow.status = "returned";

    const overdueDays = Math.ceil(
      (borrow.returnDate - borrow.dueDate) / (1000 * 60 * 60 * 24)
    );

    if (overdueDays > 0) {
      const fineAmount = overdueDays * Number(process.env.FINE_PER_DAY);

      borrow.fineAmount = fineAmount;

      await Fine.create({
        studentId: req.user._id,
        bookId,
        borrowId: borrow._id,
        amount: fineAmount,
      });
    }

    await borrow.save();

    book.availableCopies += 1;
    await book.save();

    res.status(200).json(borrow);
  } catch (error) {
    next(error);
  }
};


const getBorrowHistory = async (req, res, next) => {
  try {
    const borrows = await Borrow.find({
      studentId: req.user._id,
    }).populate("bookId");

    res.status(200).json(borrows);
  } catch (error) {
    next(error);
  }
};


const getAllBorrows = async (req, res, next) => {
  try {
    const borrows = await Borrow.find()
      .populate("studentId")
      .populate("bookId");

    res.status(200).json(borrows);
  } catch (error) {
    next(error);
  }
};

export default {
  borrowBook,
  returnBook,
  getBorrowHistory,
  getAllBorrows,
};