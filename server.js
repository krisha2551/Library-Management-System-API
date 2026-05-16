import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import express from "express";
import helmet from "helmet";
import hpp from "hpp";
import cors from "cors";

import HttpError from "./middleware/HttpError.js";
import { rateLimiter } from "./middleware/rateLimit.js";

import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import borrowRoutes from "./routes/borrowRoutes.js";
import fineRoutes from "./routes/fineRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";

const app = express();


// Body parser
app.use(express.json());


// Security headers
app.use(helmet());


// CORS
app.use(cors());


// Prevent HTTP Parameter Pollution
app.use(hpp());


// Rate Limiting
app.use(rateLimiter);



// Routes
app.use("/auth", authRoutes);

app.use("/books", bookRoutes);

app.use("/students", studentRoutes);

app.use("/borrow", borrowRoutes);

app.use("/fines", fineRoutes);

app.use("/dashboard", dashboardRoutes);



// Root Route
app.get("/", (req, res) => {
  res.json("Hello from Library Management Server");
});



// 404 handler
app.use((req, res, next) => {
  next(new HttpError("Requested route not found", 404));
});



// Error middleware
app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || "Internal server error",
  });
});



async function startServer() {
  try {
    await connectDB();

    const port = process.env.PORT || 5000;

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });

  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
}

startServer();