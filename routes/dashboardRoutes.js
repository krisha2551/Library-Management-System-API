import express from "express";

import dashboardController from "../controllers/dashboardController.js";

import auth from "../middleware/auth.js";
import checkRole from "../middleware/checkRole.js";

const router = express.Router();

router.get(
  "/adminDashboard", 
  auth, 
  checkRole("admin"), 
  dashboardController.adminDashboard
);


router.get(
  "/studentDashboard", 
  auth, 
  checkRole("student"), 
  dashboardController.studentDashboard
);

export default router;