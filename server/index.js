import express from "express";
import dotenv from "dotenv";
import connectDB from "./database/db.js";
import user from "./routers/user.route.js";
import cors from "cors";
import cookieParser from "cookie-parser";

// Load environment variables
dotenv.config({});

// Connect to the database
connectDB();

const app = express();
const PORT = process.env.PORT || 4000;

// Default middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// API Routes
app.use("/api/v1/user", user);

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening at port ${PORT}`);
});
