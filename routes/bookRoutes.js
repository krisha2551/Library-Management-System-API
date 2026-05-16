import express from "express";
import bookController from "../controllers/bookController.js";
import auth from "../middleware/auth.js";
import checkRole from "../middleware/checkRole.js";
import validate from "../middleware/validate.js";
import {
  createBookSchema,
  updateBookSchema,
} from "../validations/bookSchema.js";

const router = express.Router();

router.post(
  "/addBook",
  auth,
  checkRole("admin"),
  validate(createBookSchema),
  bookController.addBook
);

router.get("/getBooks", bookController.getAllBooks);
router.get("/getBook/:id", bookController.getBookById);

router.put(
  "/updateBook/:id",
  auth,
  checkRole("admin"),
  validate(updateBookSchema),
  bookController.updateBook
);

router.delete(
  "/deleteBook/:id",
  auth,
  checkRole("admin"),
  bookController.deleteBook
);

export default router;