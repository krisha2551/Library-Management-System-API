import mongoose from "mongoose";

const BookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Book title is required"],
      trim: true,
    },

    author: {
      type: String,
      required: [true, "Author name is required"],
      trim: true,
    },

    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
    },

    isbn: {
      type: String,
      required: [true, "ISBN is required"],
      unique: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },

    totalCopies: {
      type: Number,
      required: [true, "Total copies are required"],
      min: 1,
    },

    availableCopies: {
      type: Number,
      required: [true, "Available copies are required"],
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Book = mongoose.model("Book", BookSchema);

export default Book;