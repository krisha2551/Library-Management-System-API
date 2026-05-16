import express from "express";
import studentController from "../controllers/studentController.js";
import auth from "../middleware/auth.js";
import checkRole from "../middleware/checkRole.js";

const router = express.Router();

router.get(
  "/getStudents", 
  auth, 
  checkRole("admin"), 
  studentController.getAllStudents
);

router.get(
  "/getStudent/:id", 
  auth, 
  checkRole("admin"), 
  studentController.getStudentById
);

router.put(
  "/updateStudent/:id", 
  auth, 
  checkRole("admin"), 
  studentController.updateStudent
);

router.delete(
  "/deleteStudent/:id", 
  auth, 
  checkRole("admin"), 
  studentController.deleteStudent
);

export default router;