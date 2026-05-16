import mongoose from "mongoose";

const BorrowSchema = new mongoose.Schema(
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

    issueDate: {
      type: Date,
      default: Date.now,
    },

    dueDate: {
      type: Date,
      required: true,
    },

    returnDate: {
      type: Date,
    },

    status: {
      type: String,
      enum: ["borrowed", "returned"],
      default: "borrowed",
    },

    fineAmount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Borrow = mongoose.model("Borrow", BorrowSchema);

export default Borrow;