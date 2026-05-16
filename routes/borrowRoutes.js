import express from "express";
import borrowController from "../controllers/borrowController.js";
import auth from "../middleware/auth.js";
import checkRole from "../middleware/checkRole.js";
import validate from "../middleware/validate.js";
import { borrowSchema } from "../validations/borrowSchema.js";

const router = express.Router();

router.post(
  "/borrowBook",
  auth,
  checkRole("student"),
  validate(borrowSchema),
  borrowController.borrowBook
);

router.post(
  "/returnBook",
  auth,
  checkRole("student"),
  validate(borrowSchema),
  borrowController.returnBook
);

router.get(
  "/myHistory",
  auth,
  checkRole("student"),
  borrowController.getBorrowHistory
);

router.get(
  "/allBorrows",
  auth,
  checkRole("admin"),
  borrowController.getAllBorrows
);

export default router;