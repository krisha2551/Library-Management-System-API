import express from "express";

import authController from "../controllers/authController.js";

import auth from "../middleware/auth.js";
import validate from "../middleware/validate.js";
import upload from "../middleware/upload.js";

import {
  createUserSchema,
  loginSchema,
} from "../validations/userSchema.js";

const router = express.Router();

router.post(
  "/register",
  upload.single("profileImage"),
  validate(createUserSchema),
  authController.register
);

router.post(
    "/login", 
    validate(loginSchema), 
    authController.login
);

router.get(
    "/profile", 
    auth, 
    authController.getProfile
);

router.post(
    "/logout", 
    auth, 
    authController.logout
);

export default router;