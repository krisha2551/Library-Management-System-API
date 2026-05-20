import mongoose from "mongoose";

const FineSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    bookId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },

    borrowId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Borrow",
      required: true,
    },

    amount: {
      type: Number,
      required: true,
      min: 1,
    },

    status: {
      type: String,
      enum: ["pending", "paid"],
      default: "pending",
    },

    paidAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Fine = mongoose.model("Fine", FineSchema);

export default Fine;