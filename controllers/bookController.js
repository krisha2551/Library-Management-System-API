import Book from "../models/Book.js";
import HttpError from "../middleware/HttpError.js";

const addBook = async (req, res, next) => {
  try {
    const {
      title,
      author,
      category,
      isbn,
      description,
      totalCopies,
    } = req.body;

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
      coverImage: req.file?.path,
    });

    res.status(201).json({
      message: "Book added successfully",
      book,
    });
  } catch (error) {
    next(error);
  }
};


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

    res.status(200).json(books);
  } catch (error) {
    next(error);
  }
};


const getBookById = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      throw new HttpError("Book not found", 404);
    }

    res.status(200).json(book);
  } catch (error) {
    next(error);
  }
};


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

    res.status(200).json(book);
  } catch (error) {
    next(error);
  }
};


const deleteBook = async (req, res, next) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);

    if (!book) {
      throw new HttpError("Book not found", 404);
    }

    res.status(200).json({
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