import express from "express";

import fineController from "../controllers/fineController.js";

import auth from "../middleware/auth.js";
import checkRole from "../middleware/checkRole.js";

const router = express.Router();

router.get(
  "/myFines", 
  auth, 
  checkRole("student"), 
  fineController.getMyFines
);


router.get(
  "/allFines", 
  auth, 
  checkRole("admin"), 
  fineController.getAllFines
);


router.put(
  "/payFine/:id", 
  auth, 
  checkRole("admin"), 
  fineController.payFine
);

export default router;