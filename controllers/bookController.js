import Book from "../models/Book.js";
import HttpError from "../middleware/HttpError.js";


// ADD BOOK
const addBook = async (req, res, next) => {
  try {
    const { title, author, category, isbn, description, totalCopies } = req.body;

    const existingBook = await Book.findOne({ isbn });

    if (existingBook) {
      throw new HttpError("Book already exists", 400);
    }

    const book = await Book.create({
      title,
      author,
      category,
      isbn,
      description,
      totalCopies,
      availableCopies: totalCopies,
    });

    res.status(201).json({
      success: true,
      message: "Book added successfully",
      book,
    });
  } catch (error) {
    next(error);
  }
};


// GET ALL BOOKS
const getAllBooks = async (req, res, next) => {
  try {
    const { search, category, page = 1, limit = 10 } = req.query;

    let filter = {};

    if (search) {
      filter.title = { $regex: search, $options: "i" };
    }

    if (category) {
      filter.category = category;
    }

    const books = await Book.find(filter)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const totalBooks = await Book.countDocuments(filter);

    res.status(200).json({
      success: true,
      totalBooks,
      currentPage: Number(page),
      books,
    });
  } catch (error) {
    next(error);
  }
};


// GET SINGLE BOOK
const getBookById = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      throw new HttpError("Book not found", 404);
    }

    res.status(200).json({
      success: true,
      book,
    });
  } catch (error) {
    next(error);
  }
};


// UPDATE BOOK
const updateBook = async (req, res, next) => {
  try {
    const book = await Book.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!book) {
      throw new HttpError("Book not found", 404);
    }

    res.status(200).json({
      success: true,
      message: "Book updated successfully",
      book,
    });
  } catch (error) {
    next(error);
  }
};


// DELETE BOOK
const deleteBook = async (req, res, next) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);

    if (!book) {
      throw new HttpError("Book not found", 404);
    }

    res.status(200).json({
      success: true,
      message: "Book deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export default {
  addBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
};