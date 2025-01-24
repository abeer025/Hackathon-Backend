import express from "express";
import dotenv from "dotenv";
import connectDB from "./database/db.js";
import user from "./routers/user.route.js";
import course from "./routers/course.route.js";
import batch from "./routers/batch.route.js";
import applyCourse from "./routers/applyCourse.route.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import trainer from './routers/trainer.route.js'
import assignment from "./routers/assignment.route.js"
import resourceRoutes from './routers/resources.route.js'

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
app.use("/api/v1/course", course);
app.use("/api/v1/batch", batch);
app.use("/api/v1/applyCourse", applyCourse);
app.use('/api/v1/trainer', trainer);
app.use("/api/v1/assignments", assignment);
app.use("/api/v1/resources", resourceRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening at port ${PORT}`);
});
